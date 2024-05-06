import { Gender } from "@prisma/client";
import { body } from "express-validator";
import { prismaClient } from "../..";
import { validatorMiddleware } from "../../middlewares/validatior";
import { upload } from "../upload-images";

export class AuthValidation {
    static login = () => [
        body("email").isEmail().withMessage("Invalid email"),
        body("password").notEmpty(),
        validatorMiddleware,
    ];

    static studentRegister = () => [
        upload.single("picture"),
        body("firstname").notEmpty().trim(),
        body("fathername").notEmpty().trim(),
        body("birthdate").optional().isDate(),
        body("gender").isIn(Object.values(Gender)),
        body("picture").optional(),
        body("phonenumber").isMobilePhone("any").trim(),
        body("father_phonenumber").isMobilePhone("any").trim(),
        body("location").notEmpty().isString().trim(),
        body("password").notEmpty(), // FIXME change to isStrong
        body("email")
            .isEmail()
            .withMessage("Invalid email")
            .trim()
            .custom(async (email) => {
                const isEmail = await prismaClient.student.findUnique({ where: { email }, select: { id: true } });
                if (isEmail) throw new Error("Email is token before");
                return true;
            }),
        body("level_id")
            .isString()
            .custom(async (id) => {
                const isFound = await prismaClient.level.findUnique({ where: { id }, select: { id: true } });
                if (!isFound) throw new Error("Level not found");
                return true;
            }),
        body("group_id")
            .optional()
            .isString()
            .custom(async (id) => {
                const isFound = await prismaClient.group.findUnique({ where: { id }, select: { id: true } });
                if (!isFound) throw new Error("Group not found");
                return true;
            }),
        validatorMiddleware,
    ];

    static forogtPassword = () => [body("email").isEmail().withMessage("Invalid email"), validatorMiddleware];
    static resetPassword = () => [body("password").notEmpty().withMessage("Password Required"), validatorMiddleware];
}
