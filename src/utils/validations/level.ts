import _ from "lodash";
import { body } from "express-validator";
import { validatorMiddleware } from "../../middlewares/validatior";
import { DBReused } from "../../classes/db-reused.class";
import { upload } from "../upload-images";

export class LevelValidation {
    static create = () => [
        upload.single("cover"),
        body("title")
            .notEmpty()
            .isString()
            .trim()
            .custom(async (title) => await DBReused.uniquTitleCheck("level", title)),
        body("description").notEmpty().isString().trim(),
        body("cover").optional(),
        validatorMiddleware,
    ];

    static update = () => [
        upload.single("cover"),
        body("title")
            .optional()
            .isString()
            .trim()
            .custom(async (title) => await DBReused.uniquTitleCheck("level", title)),

        body("description").optional().isString().trim(),
        body("cover").optional(),
        validatorMiddleware,
    ];
}
