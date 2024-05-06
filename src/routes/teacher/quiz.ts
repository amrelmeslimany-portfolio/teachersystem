import { Router } from "express";
import { SharedValidation, QuizValidation } from "../../utils/validations";
import { QuizController } from "../../controllers/teacher";

const quizRouter = Router();

const controller = new QuizController();

quizRouter.route("/").get(controller.get).post(QuizValidation.create(), controller.create);

quizRouter.use("/:id", SharedValidation.idParam("quiz"));

quizRouter
    .route("/:id")
    .get(controller.getDetails)
    .put(QuizValidation.update(), controller.update)
    .delete(controller.delete);

export default quizRouter;
