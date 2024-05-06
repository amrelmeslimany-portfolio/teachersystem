import { EventEmitter } from "events";
import { prismaClient } from "..";
import { TablesName } from "./types/models";

export const eventBroker = new EventEmitter();

eventBroker.on("view", async (model: TablesName, where: any, student: any) => {
    await (prismaClient[model] as any).update({
        where,
        data: {
            studentViews: {
                connectOrCreate: {
                    where: { studentId: student?.id },
                    create: { student: { connect: { id: student?.id } } },
                },
            },
        },
    });
});
