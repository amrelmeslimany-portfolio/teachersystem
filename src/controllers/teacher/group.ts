import { RequestHandler } from "express";
import expressAsyncHandler from "express-async-handler";
import { prismaClient } from "../..";
import { Group } from "@prisma/client";
import { IController } from "../../interfaces/controller";
import { BaseReponse } from "../../utils/responses";
import { ValidationException } from "../../utils/exceptions";
import { ValidtionErrorsEnum } from "../../utils/enums";
import { ApiFeatures } from "../../classes/api-features.class";
import { LIMIT_INCLUDE } from "../../utils/constants";
import { cloudinaryUpload } from "../../utils/upload-images";

export class GroupController implements IController {
    get: RequestHandler = expressAsyncHandler(async (req, res, next) => {
        const features = new ApiFeatures("group", req.query);
        const paginations = await features.paginate();
        const groups = await prismaClient.group.findMany({
            where: features.filter(),
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
        res.status(200).json({ metadata, data: groups });
    });

    create: RequestHandler = expressAsyncHandler(async (req, res, next) => {
        const { levelId, weekdaysId, ...body } = req.body as Group;

        // Validate unique time weekday
        const countWeekdayAppoint = await prismaClient.group.count(
            this.weekdayAppointWhere(body.appointTime, weekdaysId!)
        );
        if (countWeekdayAppoint > 0) return next(new ValidationException(ValidtionErrorsEnum.WEEKDAY_APPOINT_EXIST));

        const result = await cloudinaryUpload(req);
        if (result) body.cover = result.secure_url;

        const created = await prismaClient.group.create({
            data: {
                ...body,
                level: {
                    connect: { id: levelId },
                },
                weekdays: {
                    connect: { id: weekdaysId! },
                },
            },
        });

        res.status(201).json({ data: created });
    });

    getDetails: RequestHandler = expressAsyncHandler(async (req, res, next) => {
        const id = req.params.id;

        const group = await prismaClient.group.findUnique({
            where: { id },
            include: {
                students: {
                    select: {
                        id: true,
                        firstname: true,
                        fathername: true,
                        picture: true,
                    },
                    take: LIMIT_INCLUDE,
                },
                weekdays: true,
                level: { select: BaseReponse.shortenWithImg },
                _count: {
                    select: {
                        students: true,
                    },
                },
            },
        });

        res.status(200).json({
            data: group,
        });
    });

    update: RequestHandler = expressAsyncHandler(async (req, res, next) => {
        const id = req.params.id;
        const { weekdaysId, levelId, ...body } = req.body;

        const currentGroup = await prismaClient.group.findUnique({ where: { id } });

        const countWeekdayAppoint = await prismaClient.group.count(
            this.weekdayAppointWhere(
                body.appointTime || currentGroup?.appointTime,
                weekdaysId || currentGroup?.weekdaysId
            )
        );

        if (countWeekdayAppoint > 0) return next(new ValidationException(ValidtionErrorsEnum.WEEKDAY_APPOINT_EXIST));

        const data = body;

        if (levelId) {
            body.level = {
                connect: { id: levelId! },
            };
        }

        if (weekdaysId) {
            body.weekdays = {
                connect: { id: weekdaysId! },
            };
        }

        const result = await cloudinaryUpload(req);
        if (result) data.cover = result.secure_url;

        const updated = await prismaClient.group.update({ where: { id }, data });

        res.status(200).json({ data: updated });
    });

    delete: RequestHandler = expressAsyncHandler(async (req, res, next) => {
        const id = req.params.id;

        const deleted = await prismaClient.group.delete({ where: { id }, select: { id: true, title: true } });

        res.status(200).json({ data: deleted });
    });

    private weekdayAppointWhere(appointTime: Date, weekdaysId: string | null, id?: string) {
        return {
            where: {
                AND: {
                    appointTime,
                    weekdaysId,
                    ...(id && {
                        NOT: {
                            id,
                        },
                    }),
                },
            },
        };
    }
}
