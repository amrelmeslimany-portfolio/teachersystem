import { Router } from "express";
import { SharedValidation } from "../../utils/validations";
import { LessonController } from "../../controllers/student";

const lessonRouter = Router();

const controller = new LessonController();

lessonRouter.get("/", controller.get);

lessonRouter.use("/:id", SharedValidation.idParam("lesson"));

lessonRouter.get("/:id", controller.getDetails);

lessonRouter.put("/:id/like", controller.updateLike); // TEST like

export default lessonRouter;
