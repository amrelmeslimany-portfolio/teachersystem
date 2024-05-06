import { Request } from "express";
import { WeekdayKey } from "./types/models";

export const DAYS: WeekdayKey[] = ["SA", "SU", "MO", "TU", "WE", "TH", "FR"];
export const DATE_FORMAT = "YYYY-MM-DD";

export const LIMIT_INCLUDE = 10;

export const IMAGE_MAXSIZE_MEGA = 0.8;
export const ALLOWED_IMAGES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export const SERVER_URL = (req: Request) => `${req.protocol}://${req.get("host")}`;
export const EMAIL_FROM = "Amr Elmeslimany";

export const RESET_EXPIRY_MINUTES = 30;
