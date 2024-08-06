"use client";
import { BreadcrumbItemProp, GlobalBreadcrumb } from "@/components/shared/global-breadcrubm";
import { Users } from "@/lib/enums";
import React from "react";

import { Routes } from "@/lib/routes";

import Lottie from "lottie-react";
import LoadingLottie from "@/public/imgs/lottie/loader.json";
import Error from "@/components/ui/error";
import { TermOnlyType } from "@/interfaces/term";
import Info from "@/components/ui/info";
import { useGetLevelQuery } from "../level-api";
import LevelForm from "./level-form";
import { LevelOnlyType } from "@/interfaces/level";

const breadcrumbs: BreadcrumbItemProp[] = [
    {
        title: "المراحل الدراسية",
        href: Routes.teacher.levels.home,
    },
];

const EditDetails = ({ id }: { id: string }) => {
    const { data: level, isFetching, error } = useGetLevelQuery(id as any);
    if (isFetching) return <Lottie animationData={LoadingLottie} className="w-14 h-14 mx-auto my-4" />;
    if (!level || error)
        return <Info title="المرحلة غير موجوده" href={Routes.teacher.levels.home} backText="المراحل الدراسيه" />;
    return (
        <div className="container">
            <GlobalBreadcrumb type={Users.TEACHER} current={"تعديل"} items={breadcrumbs} />
            <h3 className="text-2xl font-bold">تعديل {level.data.title} </h3>
            <p className="text-sm text-gray-500 mt-1 mb-5">يمكنك تعديل فصل دراسي بملئ هذة البيانات</p>
            <div className="my-4">
                <LevelForm level={level.data as LevelOnlyType} />
            </div>
        </div>
    );
};

export default EditDetails;
