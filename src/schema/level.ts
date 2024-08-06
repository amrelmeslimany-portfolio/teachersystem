import { z } from "zod";

export const IMAGE_MAXSIZE_MEGA = 800000;
export const ALLOWED_IMAGES = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];

export const LevelSchema = z.object({
    title: z.string({ message: "يجب ادخال العنوان" }).min(5, "يجب الا تقل الحروف عن 5"),
    description: z.string({ message: "يجب ادخال الوصف" }).min(10, "عدد الاحرف لا تقل عن 10"),
    cover: z
        .any()
        .optional()
        .refine(
            (files) => (files?.length > 0 ? (files?.[0]?.size <= IMAGE_MAXSIZE_MEGA ? true : false) : true),
            `مسموح فقط ب 800كيلوبايت حجم الصورة`
        )
        .refine(
            (files) => (files?.length > 0 ? (ALLOWED_IMAGES.includes(files?.[0]?.type) ? true : false) : true),
            ALLOWED_IMAGES.join(" - ").replaceAll("image/", "") + " المسموح بهم"
        ),
});
