import { Router } from "express";
import { SharedValidation, StudentValidation } from "../../utils/validations";
import { StudentController } from "../../controllers/teacher";

const studentRouter = Router();

const controller = new StudentController();

studentRouter.route("/").get(controller.get).put(StudentValidation.update(), controller.update);

studentRouter.use("/:id", SharedValidation.idParam("student"));

studentRouter.route("/:id").get(controller.getDetails).delete(controller.delete);

export default studentRouter;
