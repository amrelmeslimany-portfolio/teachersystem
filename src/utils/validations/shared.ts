import { body, param, query } from "express-validator";
import { validatorMiddleware } from "../../middlewares/validatior";
import { prismaClient } from "../..";
import _ from "lodash";
import { TablesName } from "../types/models";
import { Gender, Student } from "@prisma/client";
import { upload } from "../upload-images";

export class SharedValidation {
    static idParam = (model: TablesName, where?: any) => [
        param("id")
            .isUUID()
            .custom(async (id) => {
                const isFound = await (prismaClient[model] as any).count({ where: { id, ...where } });
                if (isFound == 0) throw new Error(`${_.capitalize(model)} not found`);
                return true;
            }),
        validatorMiddleware,
    ];

    static duration = (fieldName: string, status: "create" | "update" = "create") => {
        if (status == "create") return body(fieldName).default("01:00").custom(customTimeSpan);

        return body(fieldName).optional().custom(customTimeSpan);
    };

    static editProfile = () => [
        upload.single("picture"),
        body("firstname").optional().isString(),
        body("lastname").optional().isString(),
        body("birthdate").optional().isDate(),
        body("gender").optional().isIn(_.values(Gender)),
        body("phonenumber").optional().isMobilePhone("any"),
        body("fatherPhonenumber").optional().isMobilePhone("any"),
        body("location").optional().isString(),
        body("school").optional().isString(),
        validatorMiddleware,
    ];

    static changePassword = () => [
        body("oldPassword").notEmpty().withMessage("Old password required"),
        body("newPassword").notEmpty().withMessage("New password required"),
        validatorMiddleware,
    ];
}

const customTimeSpan = (value: string) => {
    if (!/^(?:[0-1]?\d|2[0-3]):[0-5]\d$/.test(value)) {
        throw new Error("Invalid timespan format. Use HH:MM format (e.g., 01:00).");
    }
    return true;
};
