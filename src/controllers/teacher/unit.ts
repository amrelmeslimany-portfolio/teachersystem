import { RequestHandler } from "express";
import expressAsyncHandler from "express-async-handler";
import { prismaClient } from "../..";
import { Unit } from "@prisma/client";
import { IController } from "../../interfaces/controller";
import { BaseReponse } from "../../utils/responses";
import { ApiFeatures } from "../../classes/api-features.class";
import { LIMIT_INCLUDE } from "../../utils/constants";
import { cloudinaryUpload } from "../../utils/upload-images";

type CreateType = { term: any; level: any } & Unit;

export class UnitController implements IController {
    get: RequestHandler = expressAsyncHandler(async (req, res, next) => {
        const features = new ApiFeatures("unit", req.query);
        const paginations = await features.paginate();
        const units = await prismaClient.unit.findMany({
            where: features.filter(),
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

    create: RequestHandler = expressAsyncHandler(async (req, res, next) => {
        const { levelId, termId, ...body } = req.body as CreateType;

        const result = await cloudinaryUpload(req);
        if (result) body.cover = result.secure_url;

        const created = await prismaClient.unit.create({
            data: {
                ...body,
                level: { connect: { id: levelId } },
                term: { connect: { id: termId } },
            },
        });

        res.status(201).json({ data: created });
    });

    getDetails: RequestHandler = expressAsyncHandler(async (req, res, next) => {
        const id = req.params.id;

        const unit = await prismaClient.unit.findUnique({
            where: { id },
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
                    select: {
                        quiz: {
                            select: { ...BaseReponse.shortenWithImg, status: true },
                        },
                    },
                    take: LIMIT_INCLUDE,
                },
            },
        });

        res.status(200).json({ data: unit });
    });

    update: RequestHandler = expressAsyncHandler(async (req, res, next) => {
        const id = req.params.id;
        const { termId, levelId, ...body } = req.body as CreateType;

        const data = body;

        if (levelId) body.level = { connect: { id: levelId! } };

        if (termId) body.term = { connect: { id: termId! } };

        const result = await cloudinaryUpload(req);
        if (result) data.cover = result.secure_url;

        const updated = await prismaClient.unit.update({ where: { id }, data });

        res.status(200).json({ data: updated });
    });

    delete: RequestHandler = expressAsyncHandler(async (req, res, next) => {
        const id = req.params.id;

        const deleted = await prismaClient.unit.delete({ where: { id }, select: { id: true, title: true } });

        res.status(200).json({ data: deleted });
    });
}
