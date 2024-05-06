import _ from "lodash";
import { body } from "express-validator";
import { validatorMiddleware } from "../../middlewares/validatior";
import { DBReused } from "../../classes/db-reused.class";
import { SharedValidation } from "./shared";
import moment from "moment";
import { upload } from "../upload-images";

export class UnitValidation {
    /* 
 id: string;
    title: string;
    description: string;
    cover: string | null;
    goals: string;
    levelId: string;
    termId: string;
    
    */
    static create = () => [
        upload.single("cover"),
        body("title")
            .notEmpty()
            .isString()
            .trim()
            .custom(async (title) => await DBReused.uniquTitleCheck("unit", title)),
        body("description").notEmpty().isString().trim(),
        body("goals").notEmpty().isString().trim(),
        body("cover").optional(),
        body("termId")
            .isUUID()
            .custom(async (id) => await DBReused.isIdFound(id, "term")),
        body("levelId")
            .isUUID()
            .custom(async (id) => await DBReused.isIdFound(id, "level")),
        validatorMiddleware,
    ];

    static update = () => [
        upload.single("cover"),
        body("title")
            .optional()
            .notEmpty()
            .isString()
            .trim()
            .custom(async (title) => await DBReused.uniquTitleCheck("unit", title)),
        body("description").optional().notEmpty().isString().trim(),
        body("goals").optional().notEmpty().isString().trim(),
        body("cover").optional(),
        body("termId")
            .optional()
            .isUUID()
            .custom(async (id) => await DBReused.isIdFound(id, "term")),
        body("levelId")
            .optional()
            .isUUID()
            .custom(async (id) => await DBReused.isIdFound(id, "level")),
        validatorMiddleware,
    ];
}
