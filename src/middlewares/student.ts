import { NextFunction, Response } from "express";
import { prismaClient } from "..";
import { AuthRequest } from "./authenticated";
import { AuthException } from "../utils/exceptions";

export interface StudentRequest extends AuthRequest {
    student?: { id: string; level: { id: string } | null; group: { id: string } | null };
}

const selection = { select: { id: true } };

export const getStudentMiddleware = async (req: StudentRequest, res: Response, next: NextFunction) => {
    const student = await prismaClient.student.findUnique({
        where: { id: req.user?.id },
        select: { id: true, level: selection, group: selection, isEmailVerified: true },
    });
    if (!student?.isEmailVerified) return next(new AuthException("Email Verification Unauthorized"));
    req.student = student!;
    next();
};
