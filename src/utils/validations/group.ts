import _ from "lodash";
import { body } from "express-validator";
import { validatorMiddleware } from "../../middlewares/validatior";
import { DBReused } from "../../classes/db-reused.class";
import { SharedValidation } from "./shared";
import moment from "moment";
import { upload } from "../upload-images";

export class GroupValidation {
    /* 

    id: string;
    title: string;
    description: string;
    cover: string | null;
    weekdaysId: string | null;
    appointTime: Date;
    duration: string | null;
    levelId: string;
    
    */
    static create = () => [
        upload.single("cover"),
        body("title")
            .notEmpty()
            .isString()
            .trim()
            .custom(async (title) => await DBReused.uniquTitleCheck("group", title)),
        body("description").notEmpty().isString().trim(),
        body("cover").optional(),
        body("weekdaysId")
            .isUUID()
            .custom(async (id) => await DBReused.isIdFound(id, "weekdays")),
        body("appointTime")
            .isTime({ hourFormat: "hour24" })
            .withMessage("Invalid time format eg (HH:mm)")
            .customSanitizer((appoint) => moment(appoint, "HH:mm")),
        SharedValidation.duration("duration"),
        body("levelId")
            .isUUID()
            .custom(async (id) => await DBReused.isIdFound(id, "level")),
        validatorMiddleware,
    ];

    static update = () => [
        upload.single("cover"),
        body("title")
            .optional()
            .isString()
            .trim()
            .custom(async (title) => await DBReused.uniquTitleCheck("group", title)),
        body("description").optional().isString().trim(),
        body("cover").optional(),
        body("weekdaysId")
            .optional()
            .isUUID()
            .custom(async (id) => await DBReused.isIdFound(id, "weekdays")),
        body("appointTime")
            .optional()
            .isTime({ hourFormat: "hour24" })
            .withMessage("Invalid time format eg (HH:mm)")
            .customSanitizer((appoint) => moment(appoint, "HH:mm")),
        SharedValidation.duration("duration", "update"),
        body("levelId")
            .optional()
            .isUUID()
            .custom(async (id) => await DBReused.isIdFound(id, "level")),
        validatorMiddleware,
    ];
}
