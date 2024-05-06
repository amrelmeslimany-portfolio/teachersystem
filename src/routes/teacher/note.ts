import { Router } from "express";
import { SharedValidation, NoteValidation } from "../../utils/validations";
import { NoteController } from "../../controllers/teacher";

const noteRouter = Router();

const controller = new NoteController();

noteRouter.route("/").get(controller.get).post(NoteValidation.create(), controller.create);

noteRouter.use("/:id", SharedValidation.idParam("note"));

noteRouter
    .route("/:id")
    .get(controller.getDetails)
    .put(NoteValidation.update(), controller.update)
    .delete(controller.delete);

export default noteRouter;
