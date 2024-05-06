import { Router } from "express";
import authRouter from "./auth";
import teacherRouter from "./teacher";
import { authenticatedMiddleware } from "../middlewares/authenticated";
import studentRouter from "./student";
import profileRouter from "./profile";

const rootRouter: Router = Router();

rootRouter.use("/auth", authRouter);

// Protect below routes
rootRouter.use(authenticatedMiddleware);

rootRouter.use("/profile", profileRouter);

rootRouter.use("/teacher", teacherRouter);

rootRouter.use("/student", studentRouter);

export default rootRouter;
