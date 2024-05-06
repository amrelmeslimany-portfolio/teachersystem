import { Router } from "express";
import { SharedValidation, UnitValidation } from "../../utils/validations";
import { UnitController } from "../../controllers/teacher";

const unitRouter = Router();

const controller = new UnitController();

unitRouter.route("/").get(controller.get).post(UnitValidation.create(), controller.create);

unitRouter.use("/:id", SharedValidation.idParam("unit"));

unitRouter
    .route("/:id")
    .get(controller.getDetails)
    .put(UnitValidation.update(), controller.update)
    .delete(controller.delete);

export default unitRouter;
