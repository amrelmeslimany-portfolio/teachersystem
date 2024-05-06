import { Router } from "express";
import { AuthValidation } from "../utils/validations";
import authControllers from "../controllers/auth";

const authRouter = Router();

// authRouter.use(/(login)/, AuthValidation.login());

authRouter.post(`/teacher/login`, AuthValidation.login(), authControllers.teacher.login);

authRouter.post(`/student/login`, AuthValidation.login(), authControllers.student.login);

authRouter.post(`/student/register`, AuthValidation.studentRegister(), authControllers.student.register);

authRouter.post(`/student/forgot-password`, AuthValidation.forogtPassword(), authControllers.student.forgotPassword);

authRouter.put(
    `/student/reset-password/:resetToken/:studentId`,
    AuthValidation.resetPassword(),
    authControllers.student.resetPassword
);

authRouter.get("/student/email-verification/:studentId", authControllers.student.emailVerificarion);

authRouter.get("/student/verify-email/:resetToken/:studentId", authControllers.student.verifyEmail);

authRouter.get(`/refresh-token`, authControllers.refreshToken);

authRouter.get("/logout", authControllers.logout);

export default authRouter;
