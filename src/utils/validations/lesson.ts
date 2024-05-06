import _ from "lodash";
import { body } from "express-validator";
import { validatorMiddleware } from "../../middlewares/validatior";
import { DBReused } from "../../classes/db-reused.class";
import { upload } from "../upload-images";

export class LessonValidation {
    /* 
 id: string;
    title: string;
    description: string;
    cover: string | null;
    goals: string;
    video: string;
    unitId: string;
    */
    static create = () => [
        upload.single("cover"),
        body("title")
            .notEmpty()
            .isString()
            .trim()
            .custom(async (title) => await DBReused.uniquTitleCheck("lesson", title)),
        body("description").notEmpty().isString().trim(),
        body("goals").notEmpty().isString().trim(),
        body("video").notEmpty().isString().trim(),
        body("cover").optional(),
        body("unitId")
            .isUUID()
            .custom(async (id) => await DBReused.isIdFound(id, "unit")),
        validatorMiddleware,
    ];

    static update = () => [
        upload.single("cover"),
        body("title")
            .optional()
            .notEmpty()
            .isString()
            .trim()
            .custom(async (title) => await DBReused.uniquTitleCheck("lesson", title)),
        body("description").optional().notEmpty().isString().trim(),
        body("goals").optional().notEmpty().isString().trim(),
        body("video").optional().notEmpty().isString().trim(),
        body("cover").optional(),
        body("unitId")
            .optional()
            .isUUID()
            .custom(async (id) => await DBReused.isIdFound(id, "unit")),
        validatorMiddleware,
    ];
}
