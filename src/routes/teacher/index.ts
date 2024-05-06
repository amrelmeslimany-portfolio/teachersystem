/*
    [x] Weekdays 
    [x] Term   
    [x] Level 
    [x] Groups 
    [x] Students 
    [x] Units 
    [x] Lessons 
    [x] PDFs 
    [x] Quiz 
    [x] Notes 
*/

import { Router } from "express";
import { allowUserMiddleware } from "../../middlewares/authenticated";
import { UserTypesEnum } from "../../utils/enums";
import weekdayRouter from "./weekday";
import termRouter from "./term";
import levelRouter from "./level";
import groupRouter from "./group";
import studentRouter from "./student";
import unitRouter from "./unit";
import lessonRouter from "./lesson";
import pdfRouter from "./pdf";
import noteRouter from "./note";
import quizRouter from "./quiz";

const teacherRouter = Router();

teacherRouter.use(allowUserMiddleware(UserTypesEnum.Teacher));

teacherRouter.use(`/weekdays`, weekdayRouter);

teacherRouter.use(`/terms`, termRouter);

teacherRouter.use(`/levels`, levelRouter);

teacherRouter.use(`/groups`, groupRouter);

teacherRouter.use(`/units`, unitRouter);

teacherRouter.use(`/lessons`, lessonRouter);

teacherRouter.use(`/pdfs`, pdfRouter);

teacherRouter.use(`/notes`, noteRouter);

teacherRouter.use(`/quizes`, quizRouter);

teacherRouter.use(`/students`, studentRouter);

export default teacherRouter;
