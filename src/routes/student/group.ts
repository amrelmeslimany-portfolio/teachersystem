import { Router } from "express";
import { SharedValidation } from "../../utils/validations";
import { GroupController } from "../../controllers/student";

const groupRouter = Router();

const controller = new GroupController();

groupRouter.route("/").get(controller.get);

groupRouter.get("/:id", SharedValidation.idParam("group"), controller.getDetails);

export default groupRouter;
