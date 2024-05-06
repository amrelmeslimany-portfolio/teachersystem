import _ from "lodash";
import { body } from "express-validator";
import { validatorMiddleware } from "../../middlewares/validatior";
import { DBReused } from "../../classes/db-reused.class";
import { Status } from "@prisma/client";
import { upload } from "../upload-images";

export class PDFValidation {
    /* 
 id: string;
    title: string;
    description: string;
    cover: string | null;
    downloadUrl: string;
    pages: number | null;
    downloads: number | null;
    status: $Enums.Status | null;
    lessonId: string;
    createdAt: Date;
    */
    static create = () => [
        upload.single("cover"),
        body("title")
            .notEmpty()
            .isString()
            .trim()
            .custom(async (title) => await DBReused.uniquTitleCheck("pDF", title)),
        body("description").notEmpty().isString().trim(),
        body("downloadUrl").notEmpty().isURL().trim(),
        body("pages").optional().isInt().toInt(),
        body("status").default(Status.Puplish).isIn(_.values(Status)),
        body("lessonId")
            .isUUID()
            .custom(async (id) => await DBReused.isIdFound(id, "lesson")),
        validatorMiddleware,
    ];

    static update = () => [
        upload.single("cover"),
        body("title")
            .optional()
            .notEmpty()
            .isString()
            .trim()
            .custom(async (title) => await DBReused.uniquTitleCheck("pDF", title)),
        body("description").optional().isString().trim(),
        body("downloadUrl").optional().isURL().trim(),
        body("pages").optional().isInt().toInt(),
        body("cover").optional(),
        body("status").optional().isIn(_.values(Status)),
        body("lessonId")
            .optional()
            .isUUID()
            .custom(async (id) => await DBReused.isIdFound(id, "lesson")),
        validatorMiddleware,
    ];
}
