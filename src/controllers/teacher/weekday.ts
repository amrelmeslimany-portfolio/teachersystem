import { RequestHandler } from "express";
import expressAsyncHandler from "express-async-handler";
import { prismaClient } from "../..";
import { ValidationException } from "../../utils/exceptions";
import { DAYS, LIMIT_INCLUDE } from "../../utils/constants";
import { IController } from "../../interfaces/controller";
import _ from "lodash";
import { Weekdays } from "@prisma/client";
import { ApiFeatures } from "../../classes/api-features.class";

export class WeekdayController implements IController {
    get = expressAsyncHandler(async (req, res, next) => {
        const features = new ApiFeatures("weekdays", req.query);
        const paginations = await features.paginate();

        const weekdays = await prismaClient.weekdays.findMany({
            where: features.filter(),
            include: { _count: true },
            take: paginations.limit,
            skip: paginations.skip,
            orderBy: req.query.sort as any,
        });

        const metadata = { ...paginations };
        res.status(200).json({ metadata, data: weekdays });
    });

    getDetails = expressAsyncHandler(async (req, res, next) => {
        const id = req.params.id;

        const weekdays = await prismaClient.weekdays.findUnique({
            where: { id },
            include: {
                groups: {
                    select: {
                        id: true,
                        title: true,
                        cover: true,
                        appointTime: true,
                        description: true,
                    },
                    orderBy: {
                        appointTime: "asc",
                    },
                    take: LIMIT_INCLUDE,
                },
                _count: true,
            },
        });

        res.status(200).json({ data: weekdays });
    });

    create = expressAsyncHandler(async (req, res, next) => {
        const body = req.body;

        if (!body || Object.values(body).every((day) => !day)) {
            return next(new ValidationException("must choose at least a day"));
        }

        const sameFound = await prismaClient.weekdays.findFirst({
            where: _.fromPairs(DAYS.map((day) => [day, body[day] || null])),
            select: { id: true },
        });

        if (sameFound) return next(new ValidationException("Duplicated weekday"));

        const weekdays = await prismaClient.weekdays.create({ data: body });

        res.status(201).json({ data: weekdays });
    });

    update?: RequestHandler = expressAsyncHandler(async (req, res, next) => {
        const weekdayId = req.params.id;
        const body = req.body;

        const result = await prismaClient.$transaction(async (tsx) => {
            const updated = await tsx.weekdays.update({ where: { id: weekdayId }, data: body });
            const { id, ...weekdays } = updated;

            if (Object.values(weekdays).every((day) => !day)) {
                return new ValidationException("must choose at least a day");
            }

            // Check is weekday timeline reapeted or not
            const timeline = _.fromPairs(DAYS.map((day) => [day, weekdays[day]]));
            const sameFound = await tsx.weekdays.count({ where: timeline });

            if (sameFound > 0) throw new ValidationException("Weekday exists already");

            return updated;
        });

        res.status(200).json({ data: result });
    });

    delete = expressAsyncHandler(async (req, res, next) => {
        const weekdays = await prismaClient.weekdays.delete({ where: { id: req.params.id } });
        res.status(200).json({ data: weekdays });
    });
}
