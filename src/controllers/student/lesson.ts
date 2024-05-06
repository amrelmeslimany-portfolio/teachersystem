import { RequestHandler } from "express";
import expressAsyncHandler from "express-async-handler";
import { prismaClient } from "../..";
import { IController } from "../../interfaces/controller";
import { BaseReponse } from "../../utils/responses";
import { ApiFeatures } from "../../classes/api-features.class";
import { LIMIT_INCLUDE } from "../../utils/constants";
import { StudentRequest } from "../../middlewares/student";
import { eventBroker } from "../../utils/events";
import { NotFoundException } from "../../utils/exceptions";

export class LessonController implements IController {
    get: RequestHandler = expressAsyncHandler(async (req: StudentRequest, res, next) => {
        const { student } = req;
        const where = { unit: { levelId: student?.level?.id } };
        const features = new ApiFeatures("lesson", req.query);
        const paginations = await features.paginate(await prismaClient.lesson.count({ where }));

        const lessons = await prismaClient.lesson.findMany({
            where: { ...where, ...features.filter() },
            select: {
                id: true,
                cover: true,
                title: true,
                unit: { select: BaseReponse.shorten },
                studentViews: this.studentAction(student),
                studentLikes: this.studentAction(student),
                _count: { select: { studentLikes: true, studentViews: true } },
            },
            take: paginations.limit,
            skip: paginations.skip,
            orderBy: req.query.sort as any,
        });
        const metadata = { ...paginations };
        res.status(200).json({ metadata, data: lessons });
    });

    getDetails: RequestHandler = expressAsyncHandler(async (req: StudentRequest, res, next) => {
        const id = req.params.id;
        const { student } = req;
        const selectLesson = { unit: { levelId: student?.level?.id }, id };

        const lesson = await prismaClient.lesson.findUnique({
            where: selectLesson,
            select: {
                ...BaseReponse.shortenWithImg,
                createdAt: true,
                description: true,
                goals: true,
                studentLikes: this.studentAction(student),
                studentViews: this.studentAction(student),
                video: true,
                pdfs: {
                    select: {
                        ...BaseReponse.shortenWithImg,
                        status: true,
                    },
                    take: LIMIT_INCLUDE,
                },
                unit: { select: BaseReponse.shorten },
                _count: { select: { studentLikes: true, studentViews: true } },
            },
        });

        if (!lesson) return next(new NotFoundException("Lesson not found"));

        if (lesson?.studentViews.length == 0) eventBroker.emit("view", "lesson", selectLesson, student);

        res.status(200).json({ data: lesson });
    });

    updateLike: RequestHandler = expressAsyncHandler(async (req: StudentRequest, res, next) => {
        const id = req.params.id;
        const { student } = req;

        const isLike = (await prismaClient.lessonLikes.count({ where: { lessonId: id, studentId: student?.id } })) > 0;

        let result;

        if (isLike) {
            result = await prismaClient.lessonLikes.delete({ where: { lessonId: id, studentId: student?.id } });
        } else {
            result = await prismaClient.lessonLikes.create({
                data: { lesson: { connect: { id } }, student: { connect: { id: student?.id } } },
            });
        }

        res.status(200).json({ data: result });
    });

    private studentAction(student: any) {
        return { where: { studentId: student?.id }, select: { id: true }, take: 1 };
    }
}
