import _ from "lodash";
import { prismaClient } from "..";
import { TablesName } from "../utils/types/models";
import { StudentResponse } from "../utils/responses";
import { LIMIT_INCLUDE } from "../utils/constants";

export class DBReused {
    static duplictRange(start: Date, end: Date) {
        return {
            AND: {
                startDate: start,
                endDate: end,
            },
        };
    }

    static async uniquTitleCheck(model: TablesName, title: string) {
        const found = await (prismaClient[model] as any).count({ where: { title } });
        if (found > 0) throw new Error("Title must be unique");
        return true;
    }

    static isIdFound = async (id: string, model: TablesName) => {
        const count = await (prismaClient[model] as any).count({ where: { id } });
        if (id && count == 0) throw new Error(`${_.capitalize(model)} not found`);
        return true;
    };

    static studentActionSelect = {
        select: { id: true, student: { select: StudentResponse.select } },
        take: LIMIT_INCLUDE,
    };
}
