import { NextFunction, Request, Response } from "express";
import { AppException } from "../utils/exceptions";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import multer from "multer";
import { IMAGE_MAXSIZE_MEGA } from "../utils/constants";

type ResultAppException = { message: string; details?: any };

export const errorMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof AppException) {
        const result: ResultAppException = { message: error.message };
        if (error.details) result.details = error.details;
        return res.status(error.statusCode).json(result);
    }
    if (error instanceof PrismaClientValidationError) {
        const result: ResultAppException = { message: "Invalid queries" };
        return res.status(400).json(result);
    }

    if (error instanceof multer.MulterError) {
        let result: ResultAppException = { message: `${error.field}: ${error.message}` };
        if (error.code === "LIMIT_FILE_SIZE") {
            result = { message: `${error.field}: Allowed size is ${IMAGE_MAXSIZE_MEGA}MB` };
        }
        return res.status(422).json(result);
    }

    console.log("From central Middleware : ", error.stack);
    res.status(500).json({ message: "Internal Error" });
};
