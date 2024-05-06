import _ from "lodash";
import { body } from "express-validator";
import { validatorMiddleware } from "../../middlewares/validatior";
import { DBReused } from "../../classes/db-reused.class";
import { Status } from "@prisma/client";

export class NoteValidation {
    /* 
 id: string;
    title: string;
    body: string;
    studentViews: number | null;
    status: $Enums.Status | null;
    levelId: string;
    termId: string | null;
    createdAt: Date;
    updatedAt: Date;
    */
    static create = () => [
        body("title")
            .notEmpty()
            .isString()
            .trim()
            .custom(async (title) => await DBReused.uniquTitleCheck("note", title)),
        body("body").notEmpty().isString().trim(),
        body("status").default(Status.Puplish).isIn(_.values(Status)),
        body("levelId")
            .isUUID()
            .custom(async (id) => await DBReused.isIdFound(id, "level")),
        body("termId")
            .optional()
            .isUUID()
            .custom(async (id) => await DBReused.isIdFound(id, "term")),
        validatorMiddleware,
    ];

    static update = () => [
        body("title")
            .optional()
            .isString()
            .trim()
            .custom(async (title) => await DBReused.uniquTitleCheck("note", title)),
        body("body").optional().isString().trim(),
        body("status").default(Status.Puplish).isIn(_.values(Status)),
        body("levelId")
            .optional()
            .isUUID()
            .custom(async (id) => await DBReused.isIdFound(id, "level")),
        body("termId")
            .optional()
            .isUUID()
            .custom(async (id) => await DBReused.isIdFound(id, "term")),
        validatorMiddleware,
    ];
}
