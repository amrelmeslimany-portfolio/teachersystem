import _ from "lodash";
import { body, query } from "express-validator";
import { validatorMiddleware } from "../../middlewares/validatior";
import moment from "moment";
import { prismaClient } from "../..";
import { ValidtionErrorsEnum } from "../enums";
import { DBReused } from "../../classes/db-reused.class";
import { Term, TermStatus } from "@prisma/client";
import { SharedValidation } from "./shared";

const DATE_MSG = "Must be date";

export class TermValidation {
    /* 
    
    id: string;
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    status: $Enums.TermStatus;
    finalExamDate: Date | null;
    termId
    */

    static create = () => [
        body("title")
            .notEmpty()
            .isString()
            .trim()
            .custom(async (title) => await DBReused.uniquTitleCheck("term", title)),
        body("description").notEmpty().isString().trim(),
        body("finalExamDate").isDate().optional().withMessage(DATE_MSG).toDate(),
        body("startDate").isDate().withMessage(DATE_MSG).toDate(),
        body("levelId")
            .isUUID()
            .custom(async (id) => {
                await DBReused.isIdFound(id, "level");
                if ((await prismaClient.term.count({ where: { levelId: id } })) >= 2)
                    throw new Error("Level already has two terms");
                return true;
            }),
        body("endDate")
            .isDate()
            .withMessage(DATE_MSG)
            .toDate()
            .custom(async (endDate, { req }) => {
                await checkDateErrors(req.body.startDate, endDate, duplicateWhere);
                return true;
            }),
        validatorMiddleware,
    ];

    static update = () => [
        body("title")
            .optional()
            .isString()
            .trim()
            .custom(async (title) => await DBReused.uniquTitleCheck("term", title)),
        body("description").optional().isString().trim(),
        body("finalExamDate").isDate().optional().withMessage(DATE_MSG).toDate(),
        body("startDate").optional().isDate().withMessage(DATE_MSG).toDate(),
        body("endDate")
            .optional()
            .isDate()
            .withMessage(DATE_MSG)
            .toDate()
            .custom(async (endDate, { req }) => {
                const { startDate } = req.body;
                if (startDate) await checkDateErrors(startDate, endDate, duplicateWhere);
                return true;
            }),
        body("levelId")
            .optional()
            .isUUID()
            .custom(async (id) => {
                await DBReused.isIdFound(id, "level");
                if ((await prismaClient.term.count({ where: { levelId: id } })) >= 2)
                    throw new Error("Level already has two terms");
                return true;
            }),
        body("status").optional().isIn(_.values(TermStatus)).withMessage("status must be Open | Close"),
        validatorMiddleware,
    ];
}

const duplicateWhere = (start: Date, end: Date) => ({ where: DBReused.duplictRange(start, end) });

const checkRangeDate = (start: Date, end: Date): boolean => moment(start).isAfter(moment(end));

const checkDateErrors = async (start: Date, end: Date, where: any) => {
    if (checkRangeDate(start, end)) throw new Error(ValidtionErrorsEnum.LONGER_DATE);
    const isDuplicate = await prismaClient.term.count(where(start, end));
    if (isDuplicate > 0) throw new Error(ValidtionErrorsEnum.REPTEAD_RANGE);
};
