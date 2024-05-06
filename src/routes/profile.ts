import { Router } from "express";
import { SharedValidation } from "../utils/validations";
import { ProfileController } from "../controllers/profile";

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.put("/edit", SharedValidation.editProfile(), profileController.edit);

profileRouter.put("/change-password", SharedValidation.changePassword(), profileController.changePassword);

export default profileRouter;
