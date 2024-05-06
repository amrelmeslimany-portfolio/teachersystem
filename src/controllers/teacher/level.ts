import { RequestHandler } from "express";
import expressAsyncHandler from "express-async-handler";
import { prismaClient } from "../..";
import { Level } from "@prisma/client";
import { IController } from "../../interfaces/controller";
import { BaseReponse } from "../../utils/responses";
import { LIMIT_INCLUDE } from "../../utils/constants";
import { ApiFeatures } from "../../classes/api-features.class";
import { cloudinaryUpload } from "../../utils/upload-images";

export class LevelController implements IController {
    get: RequestHandler = expressAsyncHandler(async (req, res, next) => {
        const features = new ApiFeatures("level", req.query);
        const paginations = await features.paginate();

        const levels = await prismaClient.level.findMany({
            where: features.filter(),
            include: {
                _count: {
                    select: { groups: true, students: true, units: true },
                },
            },
            take: paginations.limit,
            skip: paginations.skip,
            orderBy: req.query.sort as any,
        });
        const metadata = { ...paginations };
        res.status(200).json({ metadata, data: levels });
    });

    create: RequestHandler = expressAsyncHandler(async (req, res, next) => {
        const body = req.body as Omit<Level, "id">;

        const result = await cloudinaryUpload(req);
        if (result) body.cover = result.secure_url;

        const created = await prismaClient.level.create({ data: body });

        res.status(201).json({ data: created });
    });

    getDetails: RequestHandler = expressAsyncHandler(async (req, res, next) => {
        const id = req.params.id;

        const level = await prismaClient.level.findUnique({
            where: { id },
            include: {
                terms: { select: BaseReponse.shorten },
                note: { select: BaseReponse.shorten, take: LIMIT_INCLUDE },
                groups: { select: BaseReponse.shortenWithImg, take: LIMIT_INCLUDE },
                quizes: { select: { ...BaseReponse.shortenWithImg, status: true }, take: LIMIT_INCLUDE },
                units: { select: BaseReponse.shortenWithImg, take: LIMIT_INCLUDE },
                students: {
                    select: {
                        id: true,
                        firstname: true,
                        fathername: true,
                        picture: true,
                    },
                    take: LIMIT_INCLUDE,
                },
                _count: {
                    select: {
                        groups: true,
                        note: true,
                        quizes: true,
                        students: true,
                        units: true,
                    },
                },
            },
        });

        res.status(200).json({ data: level });
    });

    update: RequestHandler = expressAsyncHandler(async (req, res, next) => {
        const id = req.params.id;
        const body = req.body as Partial<Omit<Level, "id">>;

        const result = await cloudinaryUpload(req);
        if (result) body.cover = result.secure_url;

        const updated = await prismaClient.level.update({ where: { id }, data: body });

        res.status(200).json({ data: updated });
    });

    delete: RequestHandler = expressAsyncHandler(async (req, res, next) => {
        const id = req.params.id;

        const deleted = await prismaClient.level.delete({ where: { id } });

        res.status(200).json({ data: deleted });
    });
}
