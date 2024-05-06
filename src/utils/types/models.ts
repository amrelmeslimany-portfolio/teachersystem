import { Prisma, Weekdays } from "@prisma/client";
import { prismaClient } from "../..";

export type TablesName = Uncapitalize<Prisma.ModelName>;

export type WeekdayKey = keyof Omit<Weekdays, "id">;

export type ExtensionArgs = Extract<Parameters<typeof prismaClient.$extends>[0], { name?: string }>;
