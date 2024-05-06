import { Router } from "express";
import { GroupValidation, SharedValidation } from "../../utils/validations";
import { GroupController } from "../../controllers/teacher";

const groupRouter = Router();

const controller = new GroupController();

groupRouter.route("/").get(controller.get).post(GroupValidation.create(), controller.create);

groupRouter.use("/:id", SharedValidation.idParam("group"));

groupRouter
    .route("/:id")
    .get(controller.getDetails)
    .put(GroupValidation.update(), controller.update)
    .delete(controller.delete);

export default groupRouter;
