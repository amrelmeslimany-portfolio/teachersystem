import _, { isBoolean } from "lodash";
import { body, param } from "express-validator";
import { validatorMiddleware } from "../../middlewares/validatior";
import { DBReused } from "../../classes/db-reused.class";
import { Question, QuestionType, Quiz, QuizStatus, Status } from "@prisma/client";
import { SharedValidation } from "./shared";
import moment from "moment";
import { CorrectAnswer, ValidtionErrorsEnum } from "../enums";
import { prismaClient } from "../..";
import { ValidationException } from "../exceptions";
import { upload } from "../upload-images";

export class QuizValidation {
    /* 

    Quiz:

id: string;
    title: string;
    description: string;
    cover: string | null;
    startDate: Date | null;
    status: $Enums.QuizStatus;
    endDate: Date | null;
    createdAt: Date;
    levelId: string;
    duration: string;
    unitIDs: string[]
    */

    /* 
        Question :

         id: string;
    grade: number;
    body: string | null;
    correctAnswer: string;
    optionA: string | null;
    optionB: string | null;
    optionC: string | null;
    optionD: string | null;
    quesionType: string | null;
    quizId: string;

    */
    static create = () => [
        upload.single("cover"),
        body("title")
            .notEmpty()
            .isString()
            .trim()
            .custom(async (title) => await DBReused.uniquTitleCheck("quiz", title)),
        body("description").notEmpty().isString().trim(),
        body("cover").optional(),
        SharedValidation.duration("duration"),
        body("status").default(QuizStatus.Pending).isIn(_.values(QuizStatus)),
        body("levelId")
            .isUUID()
            .custom(async (id) => await DBReused.isIdFound(id, "level")),
        body("startDate").optional().isDate().toDate(),
        body("endDate").optional().isDate().toDate().custom(checkEndDate),
        body("unitIDs").optional().isArray().custom(checkUnitIDs),
        body("questions").notEmpty().isArray(),
        body("questions.*.grade").notEmpty().isInt(),
        body("questions.*.body").notEmpty().isString(),
        body("questions.*.correctAnswer").notEmpty().isIn(_.values(CorrectAnswer)),
        body("questions.*.optionA").optional(),
        body("questions.*.optionB").optional(),
        body("questions.*.optionC").optional(),
        body("questions.*.optionD").optional(),
        body("questions.*.questionType").optional().isIn(_.values(QuestionType)),
        validatorMiddleware,
    ];

    static update = () => [
        upload.single("cover"),
        body("title")
            .optional()
            .isString()
            .trim()
            .custom(async (title) => await DBReused.uniquTitleCheck("quiz", title)),
        body("description").optional().isString().trim(),
        body("cover").optional(),
        SharedValidation.duration("duration", "update"),
        body("status").optional().isIn(_.values(QuizStatus)),
        body("levelId")
            .optional()
            .isUUID()
            .custom(async (id) => await DBReused.isIdFound(id, "level")),
        body("startDate").optional().isDate().toDate(),
        body("endDate").optional().isDate().toDate().custom(checkEndDate),
        body("unitIDs").optional().isArray().custom(checkUnitIDs),
        body("questions")
            .optional()
            .isArray()
            .custom(async (questions: Question[] | undefined) => {
                if (!questions || questions.length === 0) return true;

                const foundIDs = await prismaClient.question.count({
                    where: { id: { in: questions.map(({ id }) => id) } },
                });

                if (foundIDs !== questions.length) {
                    throw new ValidationException("There is question id not found");
                }

                return true;
            }),
        body("questions.*.id").isUUID(),
        body("questions.*.grade").optional().isInt(),
        body("questions.*.body").optional().isString(),
        body("questions.*.correctAnswer").optional().isIn(_.values(CorrectAnswer)),
        body("questions.*.optionA").optional(),
        body("questions.*.optionB").optional(),
        body("questions.*.optionC").optional(),
        body("questions.*.optionD").optional(),
        body("questions.*.questionType").optional().isIn(_.values(QuestionType)),
        validatorMiddleware,
    ];

    static studentSubmit = () => [
        body("answers")
            .isArray()
            .custom(async (answers?: []) => {
                if (!answers || answers.length === 0) return true;

                const foundIDs = await prismaClient.question.count({
                    where: { id: { in: _.map(answers, "questionId") } },
                });

                if (foundIDs !== answers.length) {
                    throw new ValidationException("There is question id not found");
                }

                return true;
            }),
        body("answers.*.questionId").isUUID(),
        body("answers.*.answer").isIn(_.values(CorrectAnswer)),
        validatorMiddleware,
    ];
}

const checkUnitIDs = async (IDs: any) => {
    if (!IDs) return true;
    const foundIDs = await prismaClient.unit.count({ where: { id: { in: IDs } } });
    if (foundIDs !== IDs.length) throw new Error("Some unit IDs not found");
    return true;
};

const checkEndDate = async (endDate: Date | any, { req }: any) => {
    const { startDate } = req.body;
    const isCorrectDate = startDate && moment(startDate).isAfter(endDate);
    if (isCorrectDate) throw new Error(ValidtionErrorsEnum.LONGER_DATE);
    return true;
};
