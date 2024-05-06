import jwt from "jsonwebtoken";
import { UserTypesEnum } from "../enums";

export type JWTPayloadType = {
    id: string;
    role: UserTypesEnum;
};

export const generateAccessToken = (data: JWTPayloadType) => {
    return jwt.sign(data, process.env.JWT_ACCESS_SECRET as string, { expiresIn: "10d" });
};

export const generateRefreshToken = (data: JWTPayloadType) => {
    return jwt.sign(data, process.env.JWT_REFRESH_SECRET as string, { expiresIn: "60d" });
};
