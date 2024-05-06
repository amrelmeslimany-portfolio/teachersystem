import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { ValidationException } from "../utils/exceptions";

export const validatorMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) return next();

    let extractedErrors = errors.array().map((err: any) => ({ [err.path]: err.msg }));

    next(new ValidationException("Fields not valid", extractedErrors));
};
