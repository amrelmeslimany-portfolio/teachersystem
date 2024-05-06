import { Router } from "express";
import { SharedValidation, PDFValidation } from "../../utils/validations";
import { PDFController } from "../../controllers/teacher";

const pdfRouter = Router();

const controller = new PDFController();

pdfRouter.route("/").get(controller.get).post(PDFValidation.create(), controller.create);

pdfRouter.use("/:id", SharedValidation.idParam("pDF"));

pdfRouter
    .route("/:id")
    .get(controller.getDetails)
    .put(PDFValidation.update(), controller.update)
    .delete(controller.delete);

export default pdfRouter;
