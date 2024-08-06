import { z } from "zod";

export const loginSchema = z.object({
    email: z.string({ message: "يجب ادخال البريد" }).email("البريد غير صحيح"),
    password: z.string({ message: "يجب ادخال كلمة السر" }),
});
