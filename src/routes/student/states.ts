import { Router } from "express";
import { StatesController } from "../../controllers/student/states";

const statesRouter = Router();

const controller = new StatesController();

statesRouter.get("/", controller.get);

export default statesRouter;
