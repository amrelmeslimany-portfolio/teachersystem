import { Router } from "express";
import { SharedValidation } from "../../utils/validations";
import { UnitController } from "../../controllers/student";

const unitRouter = Router();

const controller = new UnitController();

unitRouter.get("/", controller.get);

unitRouter.get("/:id", SharedValidation.idParam("unit"), controller.getDetails);

export default unitRouter;
