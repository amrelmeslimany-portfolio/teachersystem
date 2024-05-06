import { Request, RequestHandler } from "express";
import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { CookieKeysEnum, UserTypesEnum } from "../utils/enums";
import { JWTPayloadType } from "../utils/extensions/jwt";
import { AuthException, TokenException } from "../utils/exceptions";

export interface AuthRequest extends Request {
    user?: JWTPayloadType;
}

export const authenticatedMiddleware: RequestHandler = expressAsyncHandler(async (req: AuthRequest, res, next) => {
    const incomingToken = req.cookies[CookieKeysEnum.AccessToken];
    if (!incomingToken) return next(new AuthException());

    jwt.verify(incomingToken, process.env.JWT_ACCESS_SECRET!, (error: any, decoded: any) => {
        // this will sent to front then front will generate new token with refresh token and send it back
        if (error) return next(new TokenException("JWT expired"));
        req.user = decoded;
        next();
    });
});

export const allowUserMiddleware = (type: UserTypesEnum): RequestHandler => {
    return (req: AuthRequest, res, next) => {
        if (req.user?.role != type) return next(new AuthException("Unauthorized access"));
        next();
    };
};
