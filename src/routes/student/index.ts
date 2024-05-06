/*
    [x] Statistics
    [x] Term  
    [x] Group  
    [x] Level  
    [x] Units   
    [x] Lessons  
    [x] PDFs  
    [x] Notes 
    [x] Quiz 
*/

import { Router } from "express";
import { allowUserMiddleware } from "../../middlewares/authenticated";
import { UserTypesEnum } from "../../utils/enums";
import statesRouter from "./states";
import termRouter from "./term";
import levelRouter from "./level";
import groupRouter from "./group";
import unitRouter from "./unit";
import lessonRouter from "./lesson";
import pdfRouter from "./pdf";
import noteRouter from "./note";
import quizRouter from "./quiz";
import { getStudentMiddleware } from "../../middlewares/student";

const studentRouter = Router();

studentRouter.use(allowUserMiddleware(UserTypesEnum.Student), getStudentMiddleware);

studentRouter.use(`/states`, statesRouter);

studentRouter.use(`/terms`, termRouter);

studentRouter.use(`/groups`, groupRouter);

studentRouter.use(`/levels`, levelRouter);

studentRouter.use(`/units`, unitRouter);

studentRouter.use(`/lessons`, lessonRouter);

studentRouter.use(`/pdfs`, pdfRouter);

studentRouter.use(`/notes`, noteRouter);

studentRouter.use(`/quizes`, quizRouter);

export default studentRouter;
