import { RequestHandler } from "express";
import expressAsyncHandler from "express-async-handler";
import { prismaClient } from "../..";
import { IController } from "../../interfaces/controller";
import { BaseReponse } from "../../utils/responses";
import { LIMIT_INCLUDE } from "../../utils/constants";
import { ApiFeatures } from "../../classes/api-features.class";
import { StudentRequest } from "../../middlewares/student";
import { NotFoundException } from "../../utils/exceptions";

export class LevelController implements IController {
    get: RequestHandler = expressAsyncHandler(async (req: StudentRequest, res, next) => {
        const { student } = req;
        const features = new ApiFeatures("level", req.query);
        const where = { id: student?.level?.id, ...features.filter() };
        const paginations = await features.paginate(await prismaClient.level.count({ where }));

        const levels = await prismaClient.level.findMany({
            where,
            select: { ...BaseReponse.shortenWithImg, _count: { select: { groups: true, units: true } } },
            take: paginations.limit,
            skip: paginations.skip,
            orderBy: req.query.sort as any,
        });

        const metadata = { ...paginations };

        res.status(200).json({
            metadata,
            data: levels.map((item) => ({ ...item, isMyLevel: item.id === student?.level?.id })),
        });
    });

    getDetails: RequestHandler = expressAsyncHandler(async (req: StudentRequest, res, next) => {
        const id = req.params.id;
        const { student } = req;
        const level = await prismaClient.level.findUnique({
            where: { id },
            include: {
                terms: {
                    select: { ...BaseReponse.shorten, startDate: true, endDate: true, finalExamDate: true },
                },
                units: {
                    select: { ...BaseReponse.shortenWithImg, _count: { select: { lessons: true } } },
                    take: LIMIT_INCLUDE,
                },
                _count: {
                    select: {
                        groups: true,
                        units: true,
                    },
                },
            },
        });

        if (!level) return next(new NotFoundException("Level not found"));

        res.status(200).json({ data: { ...level, isMyLevel: id === student?.level?.id } });
    });
}
