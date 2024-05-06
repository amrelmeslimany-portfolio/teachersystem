import { Router } from "express";
import { LevelValidation, SharedValidation } from "../../utils/validations";
import { LevelController } from "../../controllers/teacher";

const levelRouter = Router();

const controller = new LevelController();

levelRouter.route("/").get(controller.get).post(LevelValidation.create(), controller.create);

// // Validate the id middleware
levelRouter.use("/:id", SharedValidation.idParam("level"));

levelRouter
    .route("/:id")
    .get(controller.getDetails)
    .put(LevelValidation.update(), controller.update)
    .delete(controller.delete);

export default levelRouter;
