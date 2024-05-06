import multer from "multer";
import { BadRequestException, ValidationException } from "./exceptions";
import { ALLOWED_IMAGES, IMAGE_MAXSIZE_MEGA } from "./constants";
import sharp from "sharp";
import { Request } from "express";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

export const upload = multer({
    storage: multer.memoryStorage(),
    limits: { files: 1, fileSize: 1_000_000 * IMAGE_MAXSIZE_MEGA },
    fileFilter(req, file, callback) {
        if (file && !ALLOWED_IMAGES.includes(file.mimetype)) return callback(new ValidationException("Invalid file"));
        callback(null, true);
    },
});

export const toWebp = async (req: Request) => {
    return await sharp(req.file?.buffer)
        .toFormat("webp")
        .resize({ width: 500, height: 500 })
        .webp({ quality: 18 })
        .toBuffer();
};

export const cloudinaryUpload = async (req: Request): Promise<UploadApiResponse | undefined> => {
    if (!req.file) return;
    const webp = await toWebp(req);
    return new Promise((resolve, reject) => {
        if (req.file) {
            cloudinary.uploader
                .upload_stream({ folder: "teacherSystem", allowed_formats: ["webp"] }, (err, res) => {
                    if (err) reject(new BadRequestException("Somthing went wrong with upload img"));
                    else resolve(res);
                })
                .end(webp);
        }
    });
};
