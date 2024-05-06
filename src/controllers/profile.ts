import { RequestHandler } from "express";
import expressAsyncHandler from "express-async-handler";
import { AuthRequest } from "../middlewares/authenticated";
import { IEditProfile } from "../interfaces/profile";
import { UserTypesEnum } from "../utils/enums";
import { prismaClient } from "..";
import { cloudinaryUpload } from "../utils/upload-images";
import { JWTPayloadType } from "../utils/extensions/jwt";
import bcrypt from "bcrypt";
import { ValidationException } from "../utils/exceptions";

export class ProfileController {
    edit: RequestHandler = expressAsyncHandler(async (req: AuthRequest, res, next) => {
        const { id, role } = req.user!;
        const body = req.body as IEditProfile;

        const uploadImgReponse = await cloudinaryUpload(req);

        if (uploadImgReponse) {
            body.picture = uploadImgReponse.secure_url;
        }

        let result;

        if (role == UserTypesEnum.Student) {
            result = await prismaClient.student.update({ where: { id }, data: this._studentBody(body) });
        } else if (role == UserTypesEnum.Teacher) {
            result = await prismaClient.teacher.update({ where: { id }, data: this._teacherBody(body) });
        }

        const { password, ...data } = result!;

        res.status(200).json({ data });
    });

    changePassword: RequestHandler = expressAsyncHandler(async (req: AuthRequest, res, next) => {
        const { id, role } = req.user!;
        const { oldPassword, newPassword } = req.body;
        const currentUser = await this._checkCurrentUser(req.user!);

        const matchPassword = await bcrypt.compare(oldPassword, currentUser!.password);
        if (!matchPassword) return next(new ValidationException("Old password wrong"));

        const salt = await bcrypt.genSalt();
        const hashedNewPassword = await bcrypt.hash(newPassword, salt);

        if (role === UserTypesEnum.Student) {
            await prismaClient.student.update({ where: { id }, data: { password: hashedNewPassword } });
        } else {
            await prismaClient.teacher.update({ where: { id }, data: { password: hashedNewPassword } });
        }

        res.status(200).json({ data: "Successfully changed the password" });
    });

    private _studentBody(body: IEditProfile) {
        return {
            firstname: body.firstname,
            fathername: body.lastname,
            father_phonenumber: body.fatherPhonenumber,
            birthdate: body.birthdate,
            gender: body.gender,
            location: body.location,
            phonenumber: body.phonenumber,
            picture: body.picture,
        };
    }

    private _teacherBody(body: IEditProfile) {
        return {
            firstname: body.firstname,
            lastname: body.lastname,
            birthdate: body.birthdate,
            gender: body.gender,
            location: body.location,
            phonenumber: body.phonenumber,
            picture: body.picture,
            school: body.school,
        };
    }

    private async _checkCurrentUser({ id, role }: JWTPayloadType) {
        if (role == UserTypesEnum.Student) return await prismaClient.student.findUnique({ where: { id } });
        return await prismaClient.teacher.findUnique({ where: { id } });
    }
}
