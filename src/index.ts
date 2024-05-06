import express, { Express } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import rootRouter from "./routes";
import helmet from "helmet";
import cors from "cors";
import { errorMiddleware } from "./middlewares/errors";
import { cloudinarySettings, Port } from "./config";
import { PrismaClient } from "@prisma/client";
import { v2 as cloudinary } from "cloudinary";
import swUI from "swagger-ui-express";
import swaggerOutput from "./utils/swagger_output.json";
import { NotFoundException } from "./utils/exceptions";
import { SERVER_URL } from "./utils/constants";

// Init .env
dotenv.config();

// Init Express
const app: Express = express();

// Init Cloudinary
cloudinary.config(cloudinarySettings);

//  Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(cors({ credentials: true }));

// Init Database Client
export const prismaClient = new PrismaClient();

// Routes
app.use("/api", rootRouter);
app.use("/api-docs", swUI.serve, swUI.setup(swaggerOutput));
app.use("/*", (req, res, next) => next(new NotFoundException(`Wrong route, Swagger Doc: ${SERVER_URL(req)}/api-docs`)));

// Global Error Handler
app.use(errorMiddleware);

// Run server
app.listen(Port, () => console.log(`Running Server: http://localhost:${Port}`));
