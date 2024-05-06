import { RequestHandler } from "express";
import expressAsyncHandler from "express-async-handler";
import { prismaClient } from "../..";
import { Lesson, Unit } from "@prisma/client";
import { IController } from "../../interfaces/controller";
import { BaseReponse, StudentResponse } from "../../utils/responses";
import { ApiFeatures } from "../../classes/api-features.class";
import { LIMIT_INCLUDE } from "../../utils/constants";
import { cloudinaryUpload } from "../../utils/upload-images";
import { DBReused } from "../../classes/db-reused.class";

type CreateType = { unit: any } & Lesson;

export class LessonController implements IController {
    get: RequestHandler = expressAsyncHandler(async (req, res, next) => {
        const features = new ApiFeatures("lesson", req.query);
        const paginations = await features.paginate();
        const lessons = await prismaClient.lesson.findMany({
            where: features.filter(),
            select: {
                id: true,
                cover: true,
                title: true,
                unit: { select: BaseReponse.shorten },
            },
            take: paginations.limit,
            skip: paginations.skip,
            orderBy: req.query.sort as any,
        });
        const metadata = { ...paginations };
        res.status(200).json({ metadata, data: lessons });
    });

    create: RequestHandler = expressAsyncHandler(async (req, res, next) => {
        const { unitId, ...body } = req.body as CreateType;

        const result = await cloudinaryUpload(req);
        if (result) body.cover = result.secure_url;

        const created = await prismaClient.lesson.create({
            data: {
                ...body,
                unit: {
                    connect: { id: unitId },
                },
            },
        });

        res.status(201).json({ data: created });
    });

    getDetails: RequestHandler = expressAsyncHandler(async (req, res, next) => {
        const id = req.params.id;

        const unit = await prismaClient.lesson.findUnique({
            where: { id },
            select: {
                id: true,
                cover: true,
                createdAt: true,
                description: true,
                goals: true,
                title: true,
                video: true,
                pdfs: { select: { ...BaseReponse.shortenWithImg, status: true }, take: LIMIT_INCLUDE },
                unit: { select: BaseReponse.shorten },
                // FIXME test
                studentLikes: DBReused.studentActionSelect,
                studentViews: DBReused.studentActionSelect,
                _count: { select: { studentLikes: true, studentViews: true } },
            },
        });

        res.status(200).json({ data: unit });
    });

    update: RequestHandler = expressAsyncHandler(async (req, res, next) => {
        const id = req.params.id;

        const { unitId, ...body } = req.body as CreateType;

        const data = body;

        if (unitId) body.unit = { connect: { id: unitId! } };

        const result = await cloudinaryUpload(req);
        if (result) data.cover = result.secure_url;

        const updated = await prismaClient.lesson.update({ where: { id }, data });

        res.status(200).json({ data: updated });
    });

    delete: RequestHandler = expressAsyncHandler(async (req, res, next) => {
        const id = req.params.id;

        const deleted = await prismaClient.lesson.delete({ where: { id }, select: { id: true, title: true } });

        res.status(200).json({ data: deleted });
    });
}
