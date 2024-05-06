import { Router } from "express";
import { SharedValidation } from "../../utils/validations";
import { LevelController } from "../../controllers/student";

const levelRouter = Router();

const controller = new LevelController();

levelRouter.get("/", controller.get);

levelRouter.get("/:id", SharedValidation.idParam("level"), controller.getDetails);

export default levelRouter;
