import { z } from "zod";

export const TermSchema = z
    .object({
        title: z.string({ message: "يجب ادخال العنوان" }).min(5, "يجب الا تقل الحروف عن 5"),
        description: z.string({ message: "يجب ادخال الوصف" }).min(10, "عدد الاحرف لا تقل عن 10"),
        levelId: z.string({ message: "يجب اختيار المستوي الدراسي" }).uuid({ message: "يجب ان يكون ID" }),
        finalExamDate: z.date({ message: "يجب ان يكون تاريخ" }).optional(),
        status: z.enum(["Open", "Close"]).optional(),
        rangeDate: z.object(
            {
                from: z.date({ message: "يجب ان يكون تاريخ" }),
                to: z.date({ message: "يجب ان يكون تاريخ" }),
            },
            { required_error: "يجب اختيار الفترة الزمنيه" }
        ),
    })
    .superRefine((data, ctx) => {
        if (data.rangeDate.from > data.rangeDate.to)
            ctx.addIssue({
                code: "invalid_date",
                message: "يجب ان يكون تاريخ انتهاء الفصل يأتي بعد تاريخ البدايه",
                path: ["rangeDate"],
            });
        if (data.finalExamDate && data.rangeDate.to > data.finalExamDate)
            ctx.addIssue({
                code: "invalid_date",
                message: "يجب ان يكون تاريخ اختبار اخر الفصل يأتي بعد تاريخ النهايه",
                path: ["finalExamDate"],
            });
    })
    .transform((data) => ({
        ...data,
        startDate: data.rangeDate.from.toISOString(),
        endDate: data.rangeDate.to.toISOString(),
    }));
