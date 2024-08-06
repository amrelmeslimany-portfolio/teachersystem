"use client";
import { BreadcrumbItemProp, GlobalBreadcrumb } from "@/components/shared/global-breadcrubm";
import { Users } from "@/lib/enums";
import React from "react";

import { Routes } from "@/lib/routes";

import Lottie from "lottie-react";
import LoadingLottie from "@/public/imgs/lottie/loader.json";
import Info from "@/components/ui/info";
import WeekdaysForm from "@/features/weekdays/components/form";
import { useOneWeekdaysQuery } from "../../weekdays-api";
import { IGetWeekdays } from "@/interfaces/weekdays";

const breadcrumbs: BreadcrumbItemProp[] = [
    {
        title: "الجداول الزمنية",
        href: Routes.teacher.weekdays.home,
    },
];

const EditDetails = ({ id }: { id: string }) => {
    const { data: weekdays, isFetching, error } = useOneWeekdaysQuery(id as any);
    if (isFetching) return <Lottie animationData={LoadingLottie} className="w-14 h-14 mx-auto my-4" />;
    if (!weekdays || error)
        return <Info title="الجدول غير موجود" href={Routes.teacher.weekdays.home} backText="الجداول الزمنية" />;
    return (
        <div className="container">
            <GlobalBreadcrumb type={Users.TEACHER} current={"تعديل"} items={breadcrumbs} />

            <p className="text-sm text-gray-500 mt-1 mb-5">يمكنك تعديل الجدول بملئ هذة البيانات</p>
            <div className="my-4">
                <WeekdaysForm weekdays={weekdays.data as IGetWeekdays} />
            </div>
        </div>
    );
};

export default EditDetails;
