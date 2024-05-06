import { RequestHandler } from "express";
import expressAsyncHandler from "express-async-handler";
import { prismaClient } from "../..";
import { IController } from "../../interfaces/controller";
import { BaseReponse } from "../../utils/responses";
import { ApiFeatures } from "../../classes/api-features.class";
import { LIMIT_INCLUDE } from "../../utils/constants";
import { StudentRequest } from "../../middlewares/student";
import { NotFoundException } from "../../utils/exceptions";

export class UnitController implements IController {
    get: RequestHandler = expressAsyncHandler(async (req: StudentRequest, res, next) => {
        const { student } = req;
        const features = new ApiFeatures("unit", req.query);
        const where = { levelId: student?.level?.id, ...features.filter() };
        const paginations = await features.paginate(await prismaClient.unit.count({ where }));
        const units = await prismaClient.unit.findMany({
            where,
            select: {
                ...BaseReponse.shortenWithImg,
                level: { select: BaseReponse.shorten },
                _count: { select: { lessons: true } },
            },
            take: paginations.limit,
            skip: paginations.skip,
            orderBy: req.query.sort as any,
        });
        const metadata = { ...paginations };
        res.status(200).json({ metadata, data: units });
    });

    getDetails: RequestHandler = expressAsyncHandler(async (req: StudentRequest, res, next) => {
        const id = req.params.id;
        const { student } = req;
        const unit = await prismaClient.unit.findUnique({
            where: { levelId: student?.level?.id, id },
            select: {
                id: true,
                cover: true,
                title: true,
                description: true,
                goals: true,
                lessons: { select: BaseReponse.shortenWithImg, take: LIMIT_INCLUDE },
                level: { select: BaseReponse.shorten },
                term: { select: BaseReponse.shorten },
                quizes: {
                    select: { quiz: { select: { ...BaseReponse.shortenWithImg, status: true } } },
                    take: LIMIT_INCLUDE,
                },
            },
        });

        if (!unit) return next(new NotFoundException("Unit not found"));

        res.status(200).json({ data: unit });
    });
}
