"use client";

import { useParams } from "next/navigation";
import React from "react";
import { useGetTermQuery } from "../term-api";
import { BreadcrumbItemProp, GlobalBreadcrumb } from "@/components/shared/global-breadcrubm";
import { Status, Users } from "@/lib/enums";
import Lottie from "lottie-react";
import LoadingLottie from "@/public/imgs/lottie/loader.json";
import Error from "@/components/ui/error";
import { IError } from "@/interfaces/shared";
import { Routes } from "@/lib/routes";
import { cn, statusToAr } from "@/lib/utils";
import { AppColors } from "@/lib/theme";
import { CalendarIcon, Flame, SquareStack } from "lucide-react";
import Link from "next/link";
import ListItemIcon from "@/components/ui/list-item-icon";
import DetailsAside from "./details-aside";
import SegmentTitle from "./segment-title";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { arEG } from "date-fns/locale";
import TermActions from "./term-actions";
import Head from "next/head";

const breadcrumbs: BreadcrumbItemProp[] = [
    {
        title: "الفصول الدراسية",
        href: Routes.teacher.terms.home,
    },
];

const TermDetails = () => {
    const { id } = useParams();
    const { data, isFetching, error } = useGetTermQuery(id as any);

    if (isFetching) return <Lottie animationData={LoadingLottie} className="w-14 h-14 mx-auto my-4" />;

    if (!data || error) return <Error error="غير موجود هذا الفصل" />;

    return (
        <div className="container">
            <Head>
                <title>{data.data.title}</title>
            </Head>
            <GlobalBreadcrumb type={Users.TEACHER} items={breadcrumbs} current={data?.data.title} />
            <div className="flex md:flex-row flex-col gap-14">
                <div className="flex-grow">
                    <div className="flex gap-2 justify-between">
                        <article>
                            <h3 className="text-2xl font-bold">{data.data.title}</h3>
                            <span className={cn([AppColors.status[data.data.status], "text-sm"])}>
                                {statusToAr(data.data.status)}
                            </span>
                        </article>
                        <TermActions title={data.data.title} isBack id={id as string} />
                    </div>

                    <Separator className="mt-4 bg-gray-100 dark:bg-gray-900" />
                    <SegmentTitle label="الوصف" className="my-4">
                        {data.data.description}
                    </SegmentTitle>
                    <SegmentTitle label="المده الزمنيه" className="my-4 ">
                        <div className="flex gap-8 items-center">
                            <div className="flex items-center gap-2">
                                <CalendarIcon className=" w-4 h-4 text-gray-400" />
                                <p>{format(data.data.startDate, "LLLL dd, y", { locale: arEG })}</p>
                            </div>
                            <span className="text-gray-400 text-sm">الي</span>
                            <div className="flex items-center gap-2">
                                <CalendarIcon className=" w-4 h-4 text-gray-400" />
                                <p>{format(data.data.endDate, "LLLL dd, y", { locale: arEG })}</p>
                            </div>
                        </div>
                    </SegmentTitle>
                    <div className="flex  items-center gap-10">
                        <SegmentTitle label="موعد اخبتار اخر الفصل" className="my-4">
                            <CalendarIcon className=" w-4 h-4 text-gray-400 inline-block me-2" />
                            {data.data.finalExamDate
                                ? format(data.data.finalExamDate, "LLLL dd, y", { locale: arEG })
                                : "لم يتم التحديد"}
                        </SegmentTitle>
                        <SegmentTitle label="متبقي كم يوم" className="my-4">
                            <CalendarIcon className=" w-4 h-4 text-gray-400 inline-block me-2" />
                            {data.data.finalExamDate ? data.data.examReminingDate + " ايام" : "لم يتم التحديد"}
                        </SegmentTitle>
                    </div>
                </div>
                <DetailsAside
                    level={data.data.level}
                    status={data.data.status}
                    notesCount={data.data._count.note}
                    unitsCount={data.data._count.units}
                />
            </div>
        </div>
    );
};

export default TermDetails;
