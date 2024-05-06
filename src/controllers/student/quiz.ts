import { RequestHandler } from "express";
import expressAsyncHandler from "express-async-handler";
import { prismaClient } from "../..";
import { Question, Quiz, QuizStatus } from "@prisma/client";
import { IController } from "../../interfaces/controller";
import { BaseReponse, QuizResponse, StudentResponse } from "../../utils/responses";
import { BadRequestException, NotFoundException, ValidationException } from "../../utils/exceptions";
import _ from "lodash";
import { ApiFeatures } from "../../classes/api-features.class";
import { LIMIT_INCLUDE } from "../../utils/constants";
import { cloudinaryUpload } from "../../utils/upload-images";
import { StudentRequest } from "../../middlewares/student";
import moment from "moment";

/**
 * check status
 * @todo get details without questions and without start exam
 * @todo return if student do exam or not  , if yes => dont allow to take again OTHERWISE allow
 * @todo when start exam retun details with questions without correct answer add quiz with student info in database without answers
 * @todo when sumbit questions ,  check duration if end , throw error ,
 *       handle questions right or not and save in db and return the result grade
 * @todo result grade after submit will be questions with annswers student and the original answer with grades
 */

type Answer = { questionId: string; answer: string };

export class QuizController implements IController {
    get: RequestHandler = expressAsyncHandler(async (req: StudentRequest, res, next) => {
        const features = new ApiFeatures("quiz", req.query);
        const { student } = req;
        const where = { levelId: student?.level?.id, ...features.filter() };
        const paginations = await features.paginate(await prismaClient.quiz.count({ where }));

        const queses = await prismaClient.quiz.findMany({
            where,
            select: {
                id: true,
                cover: true,
                title: true,
                status: true,
                endDate: true,
                students: this.getExamed(student),
            },
            take: paginations.limit,
            skip: paginations.skip,
            orderBy: (req.query.sort as any) || { createdAt: "desc" },
        });

        const metadata = {
            ...paginations,
            totalQuizsExamed: await prismaClient.studentQuiz.count({ where: { studentId: student?.id } }),
        };

        res.status(200).json({ metadata, data: queses });
    });

    getDetails: RequestHandler = expressAsyncHandler(async (req: StudentRequest, res, next) => {
        const id = req.params.id;
        const { student } = req;
        const quiz = await prismaClient.quiz.findUnique({
            where: { id, levelId: student?.level?.id },
            include: {
                level: { select: BaseReponse.shorten },
                units: { select: { unit: { select: BaseReponse.shorten } }, take: LIMIT_INCLUDE },
                students: this.getExamed(student),
                _count: { select: { questions: true, units: true } },
            },
        });

        if (!quiz) return next(new NotFoundException("Quiz not found"));

        res.status(200).json({ data: quiz });
    });

    start: RequestHandler = expressAsyncHandler(async (req: StudentRequest, res, next) => {
        const id = req.params.id;
        const { student } = req;
        const where = { id, levelId: student?.level?.id };

        // Check if the user has already taken
        const isTaken = (await prismaClient.studentQuiz.count({ where: { quizId: id, studentId: student!.id } })) > 0;
        if (isTaken) return next(new ValidationException("This exam taken before"));

        const quiz = await prismaClient.quiz.findUnique({
            where,
            select: {
                ...BaseReponse.shortenWithImg,
                duration: true,
                description: true,
                status: true,
                endDate: true,
                level: { select: BaseReponse.shorten },
                questions: { select: QuizResponse.selectQuestion },
            },
        });
        // Check quiz find or not
        if (!quiz) return next(new NotFoundException("Quiz not found"));
        if (quiz.status != QuizStatus.InProgress) return next(new ValidationException("Quiz not in progress"));

        // Check quiz expiry
        if (moment(quiz.endDate).isBefore(moment())) return next(new ValidationException("Quiz expired date"));

        const metadata = { totalGrade: _.sumBy(quiz.questions, "grade") };

        const studentQuizId = await prismaClient.studentQuiz.create({
            data: { quiz: { connect: { id: quiz.id } }, student: { connect: { id: student?.id } } },
            select: { id: true },
        });

        res.status(200).json({ metadata, data: { ...quiz, studentQuizId } });
    });

    submit: RequestHandler = expressAsyncHandler(async (req: StudentRequest, res, next) => {
        const id = req.params.id;
        const { student } = req;
        const answers: Answer[] = req.body.answers;
        const where = { id, levelId: student?.level?.id };

        const quiz = await prismaClient.quiz.findUnique({
            where,
            select: { duration: true, questions: { select: { id: true, correctAnswer: true } } },
        });

        // Check quiz find
        if (!quiz) return next(new BadRequestException("Quiz not found"));

        // Check right quiz to submit
        const studentQuiz = await prismaClient.studentQuiz.findFirst({ where: { quizId: id, studentId: student?.id } });
        if (!studentQuiz) return next(new BadRequestException("Wrong exam"));

        // Check sumbited before
        if ((await prismaClient.studentQuestion.count({ where: { studentquizId: studentQuiz.id } })) > 0)
            return next(new ValidationException("You submited already"));

        // Check duration
        const duration = moment(quiz.duration, "HH:mm");
        const totalDuration = moment(studentQuiz.createdAt)
            .add(duration.hour(), "hour")
            .add(duration.minute(), "minutes");

        if (totalDuration.isSameOrBefore(moment())) return next(new ValidationException("Duration expired"));

        // Save questions answers
        const studentQuestions = await prismaClient.studentQuestion.createMany({
            data: answers.map((item) => ({
                questionId: item.questionId,
                studentquizId: studentQuiz.id,
                isCorrect: _.find(quiz.questions, { id: item.questionId })?.correctAnswer === item.answer,
                studentAnswer: item.answer,
            })),
        });

        if (studentQuestions.count == 0) return next(new BadRequestException("Somthing wrong happened"));

        // Save grade
        const correctAnswers = await prismaClient.studentQuestion.findMany({
            where: { studentquizId: studentQuiz.id, isCorrect: true },
            select: { question: { select: { grade: true } } },
        });

        await prismaClient.studentQuiz.update({
            where: { id: studentQuiz.id },
            data: { grade: _.sumBy(correctAnswers, "question.grade") },
        });

        // Return answerd
        const response = await prismaClient.studentQuiz.findUnique({
            where: { id: studentQuiz.id },
            select: {
                questions: { select: { isCorrect: true, studentAnswer: true, question: { select: { grade: true } } } },
            },
        });

        res.status(200).json({ data: response });
    });

    getResult: RequestHandler = expressAsyncHandler(async (req: StudentRequest, res, next) => {
        const id = req.params.id;
        const { student } = req;

        const quiz = await prismaClient.studentQuiz.findFirst({
            where: { quizId: id, studentId: student?.id },
            select: {
                id: true,
                createdAt: true,
                grade: true,
                questions: {
                    select: {
                        isCorrect: true,
                        studentAnswer: true,
                        question: { select: { ...QuizResponse.selectQuestion, correctAnswer: true } },
                    },
                },
                quiz: {
                    select: {
                        id: true,
                        cover: true,
                        description: true,
                        title: true,
                        duration: true,
                    },
                },
            },
        });

        if (!quiz) return next(new NotFoundException("No Quiz"));

        res.status(200).json({ data: quiz });
    });

    private getExamed(student: any) {
        return { where: { studentId: student!.id }, take: 1 };
    }
}
