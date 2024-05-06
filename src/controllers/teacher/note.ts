import { RequestHandler } from "express";
import expressAsyncHandler from "express-async-handler";
import { prismaClient } from "../..";
import { Note } from "@prisma/client";
import { IController } from "../../interfaces/controller";
import { BaseReponse, StudentResponse } from "../../utils/responses";
import { ApiFeatures } from "../../classes/api-features.class";
import { LIMIT_INCLUDE } from "../../utils/constants";
import { DBReused } from "../../classes/db-reused.class";

type CreateType = { level: any; term: any } & Note;

export class NoteController implements IController {
    get: RequestHandler = expressAsyncHandler(async (req, res, next) => {
        const features = new ApiFeatures("note", req.query);
        const paginations = await features.paginate();
        const notes = await prismaClient.note.findMany({
            where: features.filter(),
            select: {
                id: true,
                title: true,
                status: true,
                level: { select: BaseReponse.shorten },
                _count: { select: { studentViews: true } },
            },
            take: paginations.limit,
            skip: paginations.skip,
            orderBy: req.query.sort as any,
        });
        const metadata = { ...paginations };
        res.status(200).json({ metadata, data: notes });
    });

    create: RequestHandler = expressAsyncHandler(async (req, res, next) => {
        const { termId, levelId, ...body } = req.body as CreateType;

        const created = await prismaClient.note.create({
            data: {
                ...body,
                level: { connect: { id: levelId } },
                ...(termId && { term: { connect: { id: termId } } }),
            },
        });

        res.status(201).json({ data: created });
    });

    getDetails: RequestHandler = expressAsyncHandler(async (req, res, next) => {
        const id = req.params.id;

        const note = await prismaClient.note.findUnique({
            where: { id },
            select: {
                id: true,
                body: true,
                createdAt: true,
                status: true,
                title: true,
                updatedAt: true,
                level: { select: BaseReponse.shorten },
                term: { select: BaseReponse.shorten },
                // FIXME test
                studentViews: DBReused.studentActionSelect,
                _count: { select: { studentViews: true } },
            },
        });

        res.status(200).json({ data: note });
    });

    update: RequestHandler = expressAsyncHandler(async (req, res, next) => {
        const id = req.params.id;

        const { levelId, termId, ...body } = req.body as CreateType;

        const data = body;

        if (termId) body.term = { connect: { id: termId! } };
        if (levelId) body.level = { connect: { id: levelId! } };

        const updated = await prismaClient.note.update({ where: { id }, data });

        res.status(200).json({ data: updated });
    });

    delete: RequestHandler = expressAsyncHandler(async (req, res, next) => {
        const id = req.params.id;

        const deleted = await prismaClient.note.delete({ where: { id }, select: { id: true, title: true } });

        res.status(200).json({ data: deleted });
    });
}
