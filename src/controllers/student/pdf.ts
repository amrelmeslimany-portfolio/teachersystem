import { RequestHandler } from "express";
import expressAsyncHandler from "express-async-handler";
import { prismaClient } from "../..";
import { IController } from "../../interfaces/controller";
import { BaseReponse } from "../../utils/responses";
import { ApiFeatures } from "../../classes/api-features.class";
import { StudentRequest } from "../../middlewares/student";
import { NotFoundException } from "../../utils/exceptions";

export class PDFController implements IController {
    get: RequestHandler = expressAsyncHandler(async (req: StudentRequest, res, next) => {
        const features = new ApiFeatures("pDF", req.query);
        const where: any = this.where(req.student);
        const paginations = await features.paginate(await prismaClient.pDF.count({ where }));

        const pdfs = await prismaClient.pDF.findMany({
            where,
            select: {
                id: true,
                cover: true,
                title: true,
                status: true,
            },
            take: paginations.limit,
            skip: paginations.skip,
            orderBy: req.query.sort as any,
        });
        const metadata = { ...paginations };
        res.status(200).json({ metadata, data: pdfs });
    });

    getDetails: RequestHandler = expressAsyncHandler(async (req: StudentRequest, res, next) => {
        const id = req.params.id;

        const pdf = await prismaClient.pDF.findUnique({
            where: { ...this.where(req.student), id },
            include: {
                lesson: {
                    select: {
                        ...BaseReponse.shortenWithImg,
                        unit: {
                            select: { ...BaseReponse.shorten, level: { select: BaseReponse.shorten } },
                        },
                    },
                },
            },
        });

        if (!pdf) return next(new NotFoundException("PDF not found"));

        res.status(200).json({ data: pdf });
    });

    private where(student: any): any {
        return { lesson: { unit: { level: { id: student?.level?.id } } }, status: "Puplish" };
    }
}
