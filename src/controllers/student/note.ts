import { RequestHandler } from "express";
import expressAsyncHandler from "express-async-handler";
import { prismaClient } from "../..";
import { IController } from "../../interfaces/controller";
import { BaseReponse } from "../../utils/responses";
import { ApiFeatures } from "../../classes/api-features.class";
import { StudentRequest } from "../../middlewares/student";
import { eventBroker } from "../../utils/events";
import { NotFoundException } from "../../utils/exceptions";

export class NoteController implements IController {
    get: RequestHandler = expressAsyncHandler(async (req: StudentRequest, res, next) => {
        const features = new ApiFeatures("note", req.query);
        const paginations = await features.paginate(await prismaClient.note.count({ where: this.where(req.student) }));
        const notes = await prismaClient.note.findMany({
            where: this.where(req.student),
            select: {
                id: true,
                title: true,
                status: true,
                studentViews: this.studentAction(req.student),
                level: { select: BaseReponse.shorten },
            },
            take: paginations.limit,
            skip: paginations.skip,
            orderBy: req.query.sort as any,
        });
        const metadata = { ...paginations };
        res.status(200).json({ metadata, data: notes });
    });

    getDetails: RequestHandler = expressAsyncHandler(async (req: StudentRequest, res, next) => {
        const id = req.params.id;

        const note = await prismaClient.note.findUnique({
            where: this.where(req.student),
            select: {
                id: true,
                body: true,
                createdAt: true,
                status: true,
                studentViews: this.studentAction(req.student),
                title: true,
                updatedAt: true,
                level: { select: BaseReponse.shorten },
                term: { select: BaseReponse.shorten },
                _count: { select: { studentViews: true } },
            },
        });

        if (!note) return next(new NotFoundException("Term not found"));

        if (note?.studentViews.length == 0) eventBroker.emit("view", "note", { id }, req.student);

        res.status(200).json({ data: note });
    });

    private studentAction(student: any) {
        return { where: { studentId: student?.id }, select: { id: true }, take: 1 };
    }

    private where(student: any): any {
        return { status: "Puplish", levelId: student?.level?.id };
    }
}
