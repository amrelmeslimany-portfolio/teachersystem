import { CookieOptions } from "express";
import { isProduction } from "../utils/helpers";
import cloudinary from "cloudinary";

export const Port = process.env.PORT || 3005;

export const authCookesOptions: CookieOptions = {
    httpOnly: true,
    secure: isProduction,
};

export const cloudinarySettings: cloudinary.ConfigOptions = {
    cloud_name: process.env.CLOUDINARY_NAME,
    api_secret: process.env.CLOUDINARY_SECRET,
    api_key: process.env.CLOUDINARY_KEY,
};
