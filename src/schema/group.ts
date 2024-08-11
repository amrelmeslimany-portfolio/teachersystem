import { ALLOWED_IMAGES, IMAGE_MAXSIZE_MEGA } from "@/lib/constants";
import { format } from "date-fns";
import { z } from "zod";

export const GroupSchema = z.object({
    title: z.string({ message: "يجب ادخال العنوان" }).min(5, "يجب الا تقل الحروف عن 5"),
    description: z
        .string({ message: "يجب ادخال الوصف" })
        .min(10, "عدد الاحرف لا تقل عن 10")
        .max(255, "يجب الا يزيد عن 255 حرف"),
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
    weekdaysId: z.string({ message: "يجب اختيار جدول زمني" }).uuid({ message: "يجب ان يكون UUID" }),
    levelId: z.string({ message: "يجب اختيار مرحلة دراسية " }).uuid({ message: "يجب ان يكون UUID" }),
    appointTime: z
        .string({ message: "يجب ان تختار موعد" })
        .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: "يجب ان يكون HH:mm" }),
    duration: z
        .object({
            hour: z.string().default("0"),
            minute: z.string().default("0"),
        })
        .refine((value) => `${value?.hour}:${value?.minute}`)
        .optional(),
});
