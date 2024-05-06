import { RequestHandler } from "express";
import expressAsyncHandler from "express-async-handler";
import { prismaClient } from "../..";
import { IController } from "../../interfaces/controller";
import { StudentRequest } from "../../middlewares/student";
import { BaseReponse } from "../../utils/responses";
import _ from "lodash";

export class StatesController implements IController {
    get: RequestHandler = expressAsyncHandler(async (req: StudentRequest, res, next) => {
        const student = req.student;
        const whereLevel = { levelId: student?.level?.id };
        const takenQuiz = await prismaClient.studentQuiz.findMany({
            where: this.studentWhere(student),
            select: { id: true, grade: true },
        });
        const data = {
            units: await prismaClient.unit.count({ where: whereLevel }),
            lessons: await prismaClient.lesson.count({ where: { unit: whereLevel } }),
            lessonsView: await prismaClient.views.count({
                where: { ...this.studentWhere(student), lessonId: { not: null } },
            }),
            lessonLikes: await prismaClient.lessonLikes.count({ where: this.studentWhere(student) }),
            quizes: await prismaClient.quiz.count({ where: whereLevel }),
            takenQuizes: takenQuiz.length,
            leftQuizes: await prismaClient.quiz.count({
                where: {
                    id: { notIn: _.map(takenQuiz, "id") },
                    AND: { status: "Finished", endDate: { lt: new Date() } },
                },
            }),
            quizAVGMarks: _.meanBy(takenQuiz, "grade"),
            nextQuiz: await prismaClient.quiz.findMany({
                where: {
                    id: { notIn: _.map(takenQuiz, "id") },
                    AND: { status: { in: ["InProgress", "Pending"] }, endDate: { gte: new Date() } },
                },
                select: BaseReponse.shortenWithImg,
                orderBy: { endDate: "asc" },
                take: 4,
            }),
            notes: await prismaClient.note.count({ where: whereLevel }),
            notesView: await prismaClient.views.count({ where: { studentId: student?.id, noteId: { not: null } } }),
        };
        res.status(200).json({ data });
    });

    private studentWhere = (student: any) => ({ studentId: student?.id });
}
