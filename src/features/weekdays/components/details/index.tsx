"use client";

import { useParams } from "next/navigation";
import React from "react";

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

import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { arEG } from "date-fns/locale";

import Head from "next/head";
import { useOneWeekdaysQuery } from "../../weekdays-api";
import WeekdaysActions from "../weekdays-actions";
import DetailsSide from "./aside";
import WeekdaysCheckedTabel, { OnlyDaysType } from "../weekdays-checked-tabel";
import { CarouselList } from "@/features/level/components/level-details/carousel-list";
import { CardItemProps } from "@/features/level/components/level-details/card-item";

const breadcrumbs: BreadcrumbItemProp[] = [
    {
        title: "الجداول الزمنية",
        href: Routes.teacher.weekdays.home,
    },
];

const WeekdaysDetails = () => {
    const { id } = useParams();
    const { data, isFetching, error } = useOneWeekdaysQuery(id as any);

    if (isFetching) return <Lottie animationData={LoadingLottie} className="w-14 h-14 mx-auto my-4" />;

    if (!data || error) return <Error error="غير موجود هذا الجدول" />;

    return (
        <div className="container">
            <GlobalBreadcrumb type={Users.TEACHER} items={breadcrumbs} current="تفصايل الجدول" />
            <div className="flex md:flex-row flex-col gap-14">
                <div className="flex-grow">
                    <WeekdaysActions title={id as string} isBack id={id as string} />

                    <Separator className="mt-4 bg-gray-100 dark:bg-gray-900" />

                    <div className="grid grid-cols-7 my-5 gap-4">
                        <WeekdaysCheckedTabel {...(data.data as OnlyDaysType)} />
                    </div>

                    <CarouselList
                        href={Routes.teacher.groups.home}
                        label="المجموعات"
                        list={data.data.groups.map(
                            (item) => ({ ...item, href: Routes.teacher.groups.home } as CardItemProps)
                        )}
                    />
                </div>
                <DetailsSide _count={data.data._count} />
            </div>
        </div>
    );
};

export default WeekdaysDetails;
