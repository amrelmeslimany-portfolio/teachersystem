import { Router } from "express";
import { SharedValidation, TermValidation } from "../../utils/validations";
import { TermController } from "../../controllers/teacher";

const termRouter = Router();

const controller = new TermController();

termRouter.route("/").get(controller.get).post(TermValidation.create(), controller.create);

// // Validate the id middleware
termRouter.use("/:id", SharedValidation.idParam("term"));

termRouter
    .route("/:id")
    .get(controller.getDetails)
    .put(TermValidation.update(), controller.update)
    .delete(controller.delete);

export default termRouter;
