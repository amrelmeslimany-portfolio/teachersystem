import { RequestHandler } from "express";
import expressAsyncHandler from "express-async-handler";
import { prismaClient } from "../..";
import { PDF } from "@prisma/client";
import { IController } from "../../interfaces/controller";
import { BaseReponse } from "../../utils/responses";
import { ApiFeatures } from "../../classes/api-features.class";
import { cloudinaryUpload } from "../../utils/upload-images";
import { v2 } from "cloudinary";

type CreateType = { lesson: any } & PDF;

export class PDFController implements IController {
    get: RequestHandler = expressAsyncHandler(async (req, res, next) => {
        const features = new ApiFeatures("pDF", req.query);
        const paginations = await features.paginate();
        const pdfs = await prismaClient.pDF.findMany({
            select: {
                id: true,
                cover: true,
                title: true,
                downloads: true,
                lesson: { select: BaseReponse.shorten },
            },
            take: paginations.limit,
            skip: paginations.skip,
            orderBy: req.query.sort as any,
        });
        const metadata = { ...paginations };
        res.status(200).json({ metadata, data: pdfs });
    });

    create: RequestHandler = expressAsyncHandler(async (req, res, next) => {
        let { lessonId, cover, ...body } = req.body as CreateType;

        const result = await cloudinaryUpload(req);
        if (result) cover = result.secure_url;

        const created = await prismaClient.pDF.create({
            data: {
                ...body,
                lesson: { connect: { id: lessonId } },
                cover,
            },
        });

        res.status(201).json({ data: created });
    });

    getDetails: RequestHandler = expressAsyncHandler(async (req, res, next) => {
        const id = req.params.id;

        const pdf = await prismaClient.pDF.findUnique({
            where: { id },
            include: {
                lesson: {
                    select: {
                        ...BaseReponse.shortenWithImg,
                        unit: {
                            select: { ...BaseReponse.shorten, level: { select: BaseReponse.shorten } },
                        },
                    },
                },
            },
        });

        res.status(200).json({ data: pdf });
    });

    update: RequestHandler = expressAsyncHandler(async (req, res, next) => {
        const id = req.params.id;

        let { lessonId, cover, ...body } = req.body as CreateType;

        const data = body;

        if (lessonId) body.lesson = { connect: { id: lessonId! } };

        const result = await cloudinaryUpload(req);
        if (result) cover = result.secure_url;

        const updated = await prismaClient.pDF.update({ where: { id }, data: { ...data, cover } });

        res.status(200).json({ data: updated });
    });

    delete: RequestHandler = expressAsyncHandler(async (req, res, next) => {
        const id = req.params.id;

        const deleted = await prismaClient.pDF.delete({ where: { id }, select: { id: true, title: true } });

        res.status(200).json({ data: deleted });
    });
}
