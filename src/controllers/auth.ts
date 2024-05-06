import expressAsyncHandler from "express-async-handler";
import moment from "moment";
import bycrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import Mail from "nodemailer/lib/mailer";
import { sendEmail } from "../utils/email";
import { Student, Teacher } from "@prisma/client";
import { RequestHandler } from "express";
import { prismaClient } from "..";
import { authCookesOptions } from "../config";
import { StudentResponse } from "../utils/responses";
import { cloudinaryUpload } from "../utils/upload-images";
import { CookieKeysEnum, UserTypesEnum } from "../utils/enums";
import { EMAIL_FROM, RESET_EXPIRY_MINUTES, SERVER_URL } from "../utils/constants";
import { generateAccessToken, generateRefreshToken, JWTPayloadType } from "../utils/extensions/jwt";
import { AuthException, BadRequestException, NotFoundException, ValidationException } from "../utils/exceptions";

type LoginType = "password" | "email";

const teacherLogin: RequestHandler = expressAsyncHandler(async (req, res, next) => {
    const body = req.body as Pick<Teacher, LoginType>;

    let found = await prismaClient.teacher.findUnique({ where: { email: body.email } });

    const error = new ValidationException("Email or Password is incorrect");

    if (!found) return next(error);

    const passwordMatch = await bycrypt.compare(body.password, found.password);

    if (!passwordMatch) return next(error);

    // JWT  Token logic here
    const jwtPayload: JWTPayloadType = { id: found.id, role: UserTypesEnum.Teacher };

    res.cookie(CookieKeysEnum.AccessToken, generateAccessToken(jwtPayload), authCookesOptions);
    res.cookie(CookieKeysEnum.RefreshToken, generateRefreshToken(jwtPayload), authCookesOptions);

    const { password, ...data } = found!;

    res.status(200).json(data);
});

const loginStudent: RequestHandler = expressAsyncHandler(async (req, res, next) => {
    const body = req.body as Pick<Student, LoginType>;

    let found = await prismaClient.student.findUnique({
        where: { email: body.email },
        select: StudentResponse.BASE,
    });

    const error = new ValidationException("Email or Password is incorrect");

    if (!found) return next(error);

    const passwordMatch = await bycrypt.compare(body.password, found.password);

    if (!passwordMatch) return next(error);

    // JWT  Token logic here
    const jwtPayload: JWTPayloadType = { id: found.id, role: UserTypesEnum.Student };

    res.cookie(CookieKeysEnum.AccessToken, generateAccessToken(jwtPayload), authCookesOptions);
    res.cookie(CookieKeysEnum.RefreshToken, generateRefreshToken(jwtPayload), authCookesOptions);

    const { password, ...data } = found!;

    res.status(200).json(data);
});

const registerStudent: RequestHandler = expressAsyncHandler(async (req, res, next) => {
    const { level_id, group_id, ...baseBody } = req.body;

    const salt = await bycrypt.genSalt();
    baseBody.password = await bycrypt.hash(baseBody.password!, salt);

    const result = await cloudinaryUpload(req);
    if (result) baseBody.picture = result.secure_url;

    const created = await prismaClient.student.create({
        data: {
            ...baseBody,
            ...(group_id && { group: { connect: { id: group_id } } }),
            level: { connect: { id: level_id } },
        },
        select: StudentResponse.BASE,
    });

    if (!created) return next(new BadRequestException("Failed to create user"));

    const { password, ...sent } = created;

    res.status(201).json(sent);
});

const refreshToken: RequestHandler = expressAsyncHandler(async (req, res, next) => {
    const token = req.cookies[CookieKeysEnum.RefreshToken] || "";

    if (!token) return next(new AuthException());

    jwt.verify(token, process.env.JWT_REFRESH_SECRET!, (error: any, decoded: any) => {
        // if refresh token expired then logout
        if (error) {
            res.clearCookie(CookieKeysEnum.RefreshToken).clearCookie(CookieKeysEnum.AccessToken);
            return next(new AuthException());
        }
        // Generate new access token
        res.cookie(
            CookieKeysEnum.AccessToken,
            generateAccessToken({ id: decoded.id, role: decoded.role }),
            authCookesOptions
        ).sendStatus(204);
    });
});

const forgotPasswordStudent = expressAsyncHandler(async (req, res, next) => {
    const email = req.body.email;
    const student = await prismaClient.student.findUnique({ where: { email }, select: { id: true } });
    if (!student) return next(new NotFoundException("Student not found"));

    const alreadySent = (await prismaClient.resetTokenStudent.count({ where: { studentId: student.id } })) > 0;
    if (alreadySent) await prismaClient.resetTokenStudent.delete({ where: { studentId: student.id } });

    const resetToken = crypto.randomBytes(32).toString("hex");
    const expireDate = moment().add(RESET_EXPIRY_MINUTES, "minute").toDate();

    const created = await prismaClient.resetTokenStudent.create({
        data: { expired: expireDate, resetToken, student: { connect: { id: student.id } } },
    });

    // BUG you must send the front-end url
    const url = `${SERVER_URL(req)}/api/auth/student/reset-password/${resetToken}/${student.id}`;
    const emailOptions: Mail.Options = {
        from: { name: "Teacher System", address: EMAIL_FROM },
        to: email,
        subject: "Reset Password",
        text: `Click on this url: \n ${url}`,
    };

    await sendEmail(emailOptions, () => {
        res.status(200).json({ data: "We sent email" });
    });
});

const resetPasswordStudent = expressAsyncHandler(async (req, res, next) => {
    const { resetToken, studentId } = req.params;
    let { password } = req.body;

    const foundResetToken = await prismaClient.resetTokenStudent.findUnique({ where: { resetToken, studentId } });

    if (!foundResetToken) return next(new BadRequestException("Invalid Token Or Student"));

    if (moment(foundResetToken.expired).isBefore(moment())) {
        await prismaClient.resetTokenStudent.delete({ where: { resetToken, studentId } });
        return next(new BadRequestException("Expired token "));
    }

    const salt = await bycrypt.genSalt();
    password = await bycrypt.hash(password, salt);

    await prismaClient.student.update({ where: { id: studentId }, data: { password } });
    await prismaClient.resetTokenStudent.delete({ where: { resetToken, studentId } });

    res.status(200).json({ data: "Successfully updated!" });
});

const emailVerificationStudent = expressAsyncHandler(async (req, res, next) => {
    const { studentId } = req.params;
    const student = await prismaClient.student.findUnique({
        where: { id: studentId },
        select: { isEmailVerified: true, email: true },
    });
    if (!student) return next(new NotFoundException("Student not found"));

    if (student.isEmailVerified) return next(new BadRequestException("Already verified email"));

    const alreadySent = (await prismaClient.resetTokenStudent.count({ where: { studentId } })) > 0;
    if (alreadySent) await prismaClient.resetTokenStudent.delete({ where: { studentId } });

    const resetToken = crypto.randomBytes(32).toString("hex");
    const expireDate = moment().add(RESET_EXPIRY_MINUTES, "minute").toDate();

    const created = await prismaClient.resetTokenStudent.create({
        data: { expired: expireDate, resetToken, student: { connect: { id: studentId } } },
    });

    const url = `${SERVER_URL(req)}/api/auth/student/verify-email/${resetToken}/${studentId}`;
    const emailOptions: Mail.Options = {
        from: { name: "Teacher System", address: EMAIL_FROM },
        to: student.email,
        subject: "Email Verificaton",
        text: `Click on this url: \n ${url}`,
    };

    await sendEmail(emailOptions, () => {
        res.status(200).json({ data: "email sent success" });
    });
});

const verifyEmailStudent = expressAsyncHandler(async (req, res, next) => {
    const { resetToken, studentId } = req.params;

    const foundResetToken = await prismaClient.resetTokenStudent.findUnique({ where: { resetToken, studentId } });

    if (!foundResetToken) return next(new BadRequestException("Invalid Token Or Student"));

    if (moment(foundResetToken.expired).isBefore(moment())) {
        await prismaClient.resetTokenStudent.delete({ where: { resetToken, studentId } });
        return next(new BadRequestException("Expired token"));
    }

    await prismaClient.student.update({ where: { id: studentId }, data: { isEmailVerified: true } });
    await prismaClient.resetTokenStudent.delete({ where: { resetToken, studentId } });

    res.writeHead(301, {
        Location: `http://localhost:3006`, // BUG front-url
    }).json({ data: "Successfully verified!" });
});

const logout: RequestHandler = async (req, res, next) => {
    const token = req.cookies[CookieKeysEnum.RefreshToken] || "";

    if (!token) return res.end();

    res.clearCookie(CookieKeysEnum.AccessToken).clearCookie(CookieKeysEnum.RefreshToken).end();
};

export default {
    teacher: {
        login: teacherLogin,
    },
    student: {
        register: registerStudent,
        login: loginStudent,
        forgotPassword: forgotPasswordStudent,
        resetPassword: resetPasswordStudent,
        emailVerificarion: emailVerificationStudent,
        verifyEmail: verifyEmailStudent,
    },
    refreshToken,
    logout,
};
