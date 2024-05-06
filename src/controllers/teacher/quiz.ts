import { RequestHandler } from "express";
import expressAsyncHandler from "express-async-handler";
import { prismaClient } from "../..";
import { Question, Quiz } from "@prisma/client";
import { IController } from "../../interfaces/controller";
import { BaseReponse, StudentResponse } from "../../utils/responses";
import { ValidationException } from "../../utils/exceptions";
import _ from "lodash";
import { ApiFeatures } from "../../classes/api-features.class";
import { LIMIT_INCLUDE } from "../../utils/constants";
import { cloudinaryUpload } from "../../utils/upload-images";

type CreateType = { level: any; questions: Question[]; unitIDs?: string[]; units?: any } & Quiz;

export class QuizController implements IController {
    get: RequestHandler = expressAsyncHandler(async (req, res, next) => {
        const features = new ApiFeatures("quiz", req.query);
        const paginations = await features.paginate();
        const queses = await prismaClient.quiz.findMany({
            where: features.filter(),
            select: {
                id: true,
                cover: true,
                title: true,
                status: true,
                endDate: true,
                level: { select: BaseReponse.shorten },
                _count: { select: { questions: true } },
            },
            take: paginations.limit,
            skip: paginations.skip,
            orderBy: (req.query.sort as any) || { createdAt: "desc" },
        });
        const metadata = {
            ...paginations,
            totalGrade: await prismaClient.question.aggregate({ _sum: { grade: true } }),
            totalStudentExamed: await prismaClient.studentQuiz.count(),
            totalByStatus: await prismaClient.quiz.groupBy({ by: ["status"], _count: true }),
        };
        res.status(200).json({ metadata, data: queses });
    });

    create: RequestHandler = expressAsyncHandler(async (req, res, next) => {
        const { levelId, questions, unitIDs, ...body } = req.body as CreateType;

        if (unitIDs && unitIDs.length > 0) {
            body.units = this.quizUnits(unitIDs);
        }

        const result = await cloudinaryUpload(req);
        if (result) body.cover = result.secure_url;

        const created = await prismaClient.quiz.create({
            data: {
                ...body,
                level: { connect: { id: levelId } },
                questions: { createMany: { data: questions } },
            },
        });

        res.status(201).json({ data: created });
    });

    getDetails: RequestHandler = expressAsyncHandler(async (req, res, next) => {
        const id = req.params.id;

        const quiz = await prismaClient.quiz.findUnique({
            where: { id },
            include: {
                level: { select: BaseReponse.shorten },
                units: { select: { unit: { select: BaseReponse.shorten } }, take: LIMIT_INCLUDE },
                questions: {
                    select: {
                        id: true,
                        body: true,
                        correctAnswer: true,
                        grade: true,
                        optionA: true,
                        optionB: true,
                        optionC: true,
                        optionD: true,
                        questionType: true,
                    },
                },
                // FIXME test when add student when create student
                students: {
                    select: {
                        student: { select: StudentResponse.select },
                        grade: true,
                    },
                    take: LIMIT_INCLUDE,
                },
            },
        });

        res.status(200).json({ data: quiz });
    });

    update: RequestHandler = expressAsyncHandler(async (req, res, next) => {
        const id = req.params.id;

        const { levelId, questions, unitIDs, ...body } = req.body as CreateType;

        if (levelId) body.level = { connect: { id: levelId! } };

        if (unitIDs && unitIDs.length > 0) {
            const checkReapeted = await prismaClient.quizUnit.count({ where: { quizId: id, unitId: { in: unitIDs } } });
            if (checkReapeted > 0) return next(new ValidationException("Unit id with this quiz already exist"));
            body.units = this.quizUnits(unitIDs);
        }

        if (questions?.length > 0) {
            (body as any).questions = {
                updateMany: questions.map((item) => ({ where: { id: item.id }, data: item })),
            };
        }

        const result = await cloudinaryUpload(req);
        if (result) body.cover = result.secure_url;

        const updated = await prismaClient.quiz.update({
            where: { id },
            data: body,
        });

        res.status(200).json({ data: updated });
    });

    delete: RequestHandler = expressAsyncHandler(async (req, res, next) => {
        const id = req.params.id;

        const inProgressCheck = await prismaClient.quiz.count({ where: { id, status: { not: "InProgress" } } });
        if (inProgressCheck === 0) return next(new ValidationException("You cant remove quiz  that in progress"));

        const deleted = await prismaClient.quiz.delete({ where: { id }, select: { id: true, title: true } });

        res.status(200).json({ data: deleted });
    });

    private quizUnits(unitIDs: string[]) {
        return { createMany: { data: unitIDs.map((unitId) => ({ unitId })) } };
    }
}
