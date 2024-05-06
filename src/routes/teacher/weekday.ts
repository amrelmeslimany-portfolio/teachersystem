import { Router } from "express";
import { SharedValidation, WeekdayValidation } from "../../utils/validations";
import { WeekdayController } from "../../controllers/teacher";

const weekdayRouter = Router();

const controller = new WeekdayController();

weekdayRouter.route("/").get(controller.get).post(WeekdayValidation.create(), controller.create);

// Validate the id middleware
weekdayRouter.use("/:id", SharedValidation.idParam("weekdays"));

weekdayRouter.route("/:id").get(controller.getDetails).put(controller.update!).delete(controller.delete);

export default weekdayRouter;
