import { Router } from "express";
import { SharedValidation } from "../../utils/validations";
import { PDFController } from "../../controllers/student";
import { Status } from "@prisma/client";

const pdfRouter = Router();

const controller = new PDFController();

// FIXME Add download files urls

pdfRouter.get("/", controller.get);

pdfRouter.get("/:id", SharedValidation.idParam("pDF", { status: Status.Puplish }), controller.getDetails);

export default pdfRouter;
