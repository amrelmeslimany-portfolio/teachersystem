import { z } from "zod";

export const WeekdaysSchema = z.object({
    SA: z.boolean().optional().nullable(),
    SU: z.boolean().optional().nullable(),
    MO: z.boolean().optional().nullable(),
    TU: z.boolean().optional().nullable(),
    WE: z.boolean().optional().nullable(),
    TH: z.boolean().optional().nullable(),
    FR: z.boolean().optional().nullable(),
});
