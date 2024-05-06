import _ from "lodash";
import { prismaClient } from "..";
import { TablesName } from "../utils/types/models";

interface IPagination {
    page: number;
    limit: number;
    skip: number;
    total: number;
    hasNext: boolean;
    hasPrevious: boolean;
}

export class ApiFeatures {
    private prisma = prismaClient[this.model] as any;
    private excludeURLKeys = ["page", "limit", "search", "sortBy", "orderBy"];
    constructor(private model: TablesName, private query: any) {}

    public async paginate(totalParam?: number): Promise<IPagination> {
        const page = Number(this.query.page || 1);
        let limit = Number(this.query.limit || 20);
        const skip = (page - 1) * limit;
        const total = totalParam || (await this.prisma.count());
        return {
            page,
            limit,
            skip,
            total,
            hasNext: total > skip + limit,
            hasPrevious: page > 1,
        };
    }

    public sort() {
        const sortBy: string | undefined = this.query.sortBy;
        const orderBy = this.query.orderBy;
        if (!sortBy) return {};
        const sortByFiedls = sortBy.split(",");
        return sortByFiedls.map((field) => ({ [field]: orderBy || "desc" }));
    }

    public filter() {
        let filterFields = _.omit(this.query, this.excludeURLKeys);
        if (_.isEmpty(filterFields)) return {};
        return filterFields;
    }
}
