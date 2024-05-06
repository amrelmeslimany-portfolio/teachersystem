import { RequestHandler } from "express";
import expressAsyncHandler from "express-async-handler";
import { prismaClient } from "../..";
import { IController } from "../../interfaces/controller";
import { BaseReponse } from "../../utils/responses";
import { ApiFeatures } from "../../classes/api-features.class";
import { StudentRequest } from "../../middlewares/student";
import { NotFoundException } from "../../utils/exceptions";

export class GroupController implements IController {
    get: RequestHandler = expressAsyncHandler(async (req: StudentRequest, res, next) => {
        const { student } = req;
        const features = new ApiFeatures("group", req.query);
        const where = { levelId: student?.level?.id, ...features.filter() };
        const paginations = await features.paginate(await prismaClient.group.count({ where }));

        const groups = await prismaClient.group.findMany({
            where,
            select: {
                id: true,
                title: true,
                appointTime: true,
                cover: true,
                level: { select: BaseReponse.shorten },
                _count: { select: { students: true } },
            },
            take: paginations.limit,
            skip: paginations.skip,
        });
        const metadata = { ...paginations };

        res.status(200).json({
            metadata,
            data: groups.map((item) => ({ ...item, isMyGroup: student?.group?.id === item.id })),
        });
    });

    getDetails: RequestHandler = expressAsyncHandler(async (req: StudentRequest, res, next) => {
        const id = req.params.id;
        const { student } = req;
        const group = await prismaClient.group.findUnique({
            where: { id, levelId: student?.level?.id },
            include: {
                weekdays: true,
                level: { select: BaseReponse.shortenWithImg },
                _count: true,
            },
        });

        if (!group) return next(new NotFoundException("Group not found"));

        const isMyGroup = id === student?.group?.id;

        res.status(200).json({ data: { ...group, isMyGroup } });
    });
}
