import { Router } from "express";
import { QuizValidation } from "../../utils/validations";
import { QuizController } from "../../controllers/student";

const quizRouter = Router();

const controller = new QuizController();

quizRouter.get("/", controller.get);

quizRouter.get("/:id", controller.getDetails);

quizRouter.get("/:id/start", controller.start);

quizRouter.post("/:id/submit", QuizValidation.studentSubmit(), controller.submit);

quizRouter.get("/:id/result", controller.getResult);

export default quizRouter;
