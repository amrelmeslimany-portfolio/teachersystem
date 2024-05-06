import { RequestHandler } from "express";
import expressAsyncHandler from "express-async-handler";
import { prismaClient } from "../..";
import { IController } from "../../interfaces/controller";
import { BaseReponse, StudentResponse } from "../../utils/responses";
import { LIMIT_INCLUDE } from "../../utils/constants";
import { ApiFeatures } from "../../classes/api-features.class";

export class StudentController implements IController {
    get: RequestHandler = expressAsyncHandler(async (req, res, next) => {
        const features = new ApiFeatures("student", req.query);
        const paginations = await features.paginate();
        const students = await prismaClient.student.findMany({
            where: features.filter(),
            select: {
                ...StudentResponse.select,
                quizes: { select: { _count: true } },
            },
            take: paginations.limit,
            skip: paginations.skip,
            orderBy: req.query.sort as any,
        });
        const metadata = {
            ...paginations,
            bestStudentGrade: await prismaClient.studentQuiz.findFirst({
                orderBy: { grade: "desc" },
                select: { student: { select: StudentResponse.select }, grade: true },
            }),
        };
        res.status(200).json({ metadata, data: students });
    });

    getDetails: RequestHandler = expressAsyncHandler(async (req, res, next) => {
        const id = req.params.id;

        const student = await prismaClient.student.findUnique({
            where: { id },
            include: {
                group: { select: BaseReponse.shortenWithImg },
                level: { select: BaseReponse.shortenWithImg },
                quizes: {
                    // FIXME test this when create student
                    take: LIMIT_INCLUDE,
                },
                _count: true,
            },
        });

        res.status(200).json({ data: student });
    });

    update: RequestHandler = expressAsyncHandler(async (req, res, next) => {
        const body = req.body;

        let query: any = {};

        if (body.levelId) query.levelId = body.levelId;

        if (body.groupId) query.groupId = body.groupId;

        const updated = await prismaClient.student.updateMany({
            where: { id: { in: body.studentIDs } },
            data: query,
        });

        res.status(200).json({ data: updated });
    });

    delete: RequestHandler = expressAsyncHandler(async (req, res, next) => {
        const id = req.params.id;

        const { password, ...deleted } = await prismaClient.student.delete({
            where: { id },
            select: StudentResponse.BASE,
        });

        res.status(200).json({ data: deleted });
    });
}
