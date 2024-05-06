import { Router } from "express";
import { SharedValidation } from "../../utils/validations";
import { NoteController } from "../../controllers/student";
import { Status } from "@prisma/client";

const noteRouter = Router();

const controller = new NoteController();

noteRouter.get("/", controller.get);

noteRouter.get("/:id", SharedValidation.idParam("note", { status: Status.Puplish }), controller.getDetails);

export default noteRouter;
