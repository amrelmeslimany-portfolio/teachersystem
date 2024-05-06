import { RequestHandler } from "express";
import expressAsyncHandler from "express-async-handler";
import { prismaClient } from "../..";
import { Term } from "@prisma/client";
import moment from "moment";
import { BaseReponse } from "../../utils/responses";
import { ValidationException } from "../../utils/exceptions";
import { ValidtionErrorsEnum } from "../../utils/enums";
import { DBReused } from "../../classes/db-reused.class";
import { IController } from "../../interfaces/controller";
import { ApiFeatures } from "../../classes/api-features.class";
import { LIMIT_INCLUDE } from "../../utils/constants";

type MutateType = Term & { level: any };

export class TermController implements IController {
    get: RequestHandler = expressAsyncHandler(async (req, res, next) => {
        const features = new ApiFeatures("term", req.query);
        const paginations = await features.paginate();

        const terms = await prismaClient.term.findMany({
            where: features.filter(),
            select: {
                id: true,
                title: true,
                status: true,
                level: { select: BaseReponse.shorten },
                _count: { select: { note: true, units: true } },
            },
            take: paginations.limit,
            skip: paginations.skip,
            orderBy: req.query.sort as any,
        });

        const metadata = { ...paginations };
        res.status(200).json({ metadata, data: terms });
    });

    create: RequestHandler = expressAsyncHandler(async (req, res, next) => {
        const { levelId, ...body } = req.body as MutateType;

        if (moment().isBetween(moment(body.startDate), moment(body.endDate))) body.status = "Open";
        else body.status = "Close";

        body.level = { connect: { id: levelId } };

        const created = await prismaClient.term.create({ data: body });

        res.status(201).json({ data: created });
    });

    getDetails: RequestHandler = expressAsyncHandler(async (req, res, next) => {
        const id = req.params.id;
        const term = await prismaClient.term.findUnique({
            where: { id },
            select: {
                id: true,
                title: true,
                description: true,
                startDate: true,
                endDate: true,
                status: true,
                finalExamDate: true,
                note: { take: LIMIT_INCLUDE },
                level: { select: BaseReponse.shorten },
                units: {
                    select: {
                        ...BaseReponse.shortenWithImg,
                        level: {
                            select: BaseReponse.shorten,
                        },
                    },
                    take: LIMIT_INCLUDE,
                },
                _count: true,
            },
        });

        const examReminingDate = term?.finalExamDate && moment(term?.finalExamDate).diff(moment(), "day");
        const response = { ...term, examReminingDate };

        res.status(200).json({ data: response });
    });

    update: RequestHandler = expressAsyncHandler(async (req, res, next) => {
        const id = req.params.id;
        const { levelId, ...body } = req.body as Partial<MutateType>;

        const foundTerm = await prismaClient.term.findUnique({ where: { id } });

        const rangeDate = {
            start: body.startDate || foundTerm?.startDate,
            end: body.endDate || foundTerm?.endDate,
        };

        if (moment(rangeDate.start).isAfter(rangeDate.end)) {
            throw new ValidationException(ValidtionErrorsEnum.LONGER_DATE);
        }

        const isReaptedRange = await prismaClient.term.count({
            where: { ...DBReused.duplictRange(rangeDate.start!, rangeDate.end!), NOT: { id } },
        });

        if (isReaptedRange > 0) throw new ValidationException(ValidtionErrorsEnum.REPTEAD_RANGE);

        if (levelId) body.level = { connect: { id: levelId } };

        const updated = await prismaClient.term.update({ where: { id }, data: body });

        res.status(200).json({ data: updated });
    });

    delete: RequestHandler = expressAsyncHandler(async (req, res, next) => {
        const id = req.params.id;

        const deleted = await prismaClient.term.delete({ where: { id } });

        res.status(200).json({ data: deleted });
    });
}
