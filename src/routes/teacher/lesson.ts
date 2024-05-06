import { Router } from "express";
import { SharedValidation, LessonValidation } from "../../utils/validations";
import { LessonController } from "../../controllers/teacher";

const lessonRouter = Router();

const controller = new LessonController();

lessonRouter.route("/").get(controller.get).post(LessonValidation.create(), controller.create);

lessonRouter.use("/:id", SharedValidation.idParam("lesson"));

lessonRouter
    .route("/:id")
    .get(controller.getDetails)
    .put(LessonValidation.update(), controller.update)
    .delete(controller.delete);

export default lessonRouter;
