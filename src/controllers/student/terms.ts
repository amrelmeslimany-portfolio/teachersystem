import { RequestHandler } from "express";
import expressAsyncHandler from "express-async-handler";
import { prismaClient } from "../..";
import moment from "moment";
import { BaseReponse } from "../../utils/responses";
import { IController } from "../../interfaces/controller";
import { ApiFeatures } from "../../classes/api-features.class";
import { LIMIT_INCLUDE } from "../../utils/constants";
import { StudentRequest } from "../../middlewares/student";
import { NotFoundException } from "../../utils/exceptions";

export class TermController implements IController {
    get: RequestHandler = expressAsyncHandler(async (req: StudentRequest, res, next) => {
        const features = new ApiFeatures("term", req.query);
        const where = { levelId: req.student?.level?.id, ...features.filter() };
        const paginations = await features.paginate(await prismaClient.term.count({ where }));

        const terms = await prismaClient.term.findMany({
            where,
            select: {
                id: true,
                title: true,
                status: true,
                level: { select: BaseReponse.shorten },
                _count: { select: { note: true, units: true } },
            },
            take: paginations.limit,
            skip: paginations.skip,
            orderBy: req.query.sort as any,
        });

        const metadata = { ...paginations };
        res.status(200).json({ metadata, data: terms });
    });

    getDetails: RequestHandler = expressAsyncHandler(async (req: StudentRequest, res, next) => {
        const id = req.params.id;
        const term = await prismaClient.term.findUnique({
            where: { id, levelId: req.student?.level?.id },
            select: {
                id: true,
                title: true,
                description: true,
                startDate: true,
                endDate: true,
                status: true,
                finalExamDate: true,
                note: { take: LIMIT_INCLUDE },
                level: { select: BaseReponse.shorten },
                units: {
                    select: {
                        ...BaseReponse.shortenWithImg,
                        level: { select: BaseReponse.shorten },
                        lessons: { select: BaseReponse.shortenWithImg, take: LIMIT_INCLUDE },
                    },
                    take: LIMIT_INCLUDE,
                },
                _count: true,
            },
        });

        if (!term) return next(new NotFoundException("Term not found"));

        const examReminingDate = term?.finalExamDate && moment(term?.finalExamDate).diff(moment(), "day");
        const response = { ...term, examReminingDate };

        res.status(200).json({ data: response });
    });
}
