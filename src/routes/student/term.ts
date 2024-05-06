import { Router } from "express";
import { SharedValidation } from "../../utils/validations";
import { TermController } from "../../controllers/student";

const termRouter = Router();

const controller = new TermController();

termRouter.get("/", controller.get);

termRouter.get("/:id", SharedValidation.idParam("term"), controller.getDetails);

export default termRouter;
