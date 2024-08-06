"use client";
import { BreadcrumbItemProp, GlobalBreadcrumb } from "@/components/shared/global-breadcrubm";
import { Users } from "@/lib/enums";
import React from "react";
import TermFrom from "./term-form/term-from";
import { Routes } from "@/lib/routes";
import { useGetTermQuery } from "../term-api";
import Lottie from "lottie-react";
import LoadingLottie from "@/public/imgs/lottie/loader.json";
import Error from "@/components/ui/error";
import { TermOnlyType } from "@/interfaces/term";
import Info from "@/components/ui/info";

const breadcrumbs: BreadcrumbItemProp[] = [
    {
        title: "الفصول الدراسية",
        href: Routes.teacher.terms.home,
    },
];

const EditDetails = ({ id }: { id: string }) => {
    const { data: term, isFetching, error } = useGetTermQuery(id as any);
    if (isFetching) return <Lottie animationData={LoadingLottie} className="w-14 h-14 mx-auto my-4" />;
    if (!term || error)
        return <Info title="غير موجود الفصل" href={Routes.teacher.terms.home} backText="الفصول الدراسيه" />;
    return (
        <div className="container">
            <GlobalBreadcrumb type={Users.TEACHER} current={"تعديل"} items={breadcrumbs} />
            <h3 className="text-2xl font-bold">تعديل {term.data.title} </h3>
            <p className="text-sm text-gray-500 mt-1 mb-5">يمكنك تعديل فصل دراسي بملئ هذة البيانات</p>
            <div className="my-4">
                <TermFrom term={term.data as TermOnlyType} />
            </div>
        </div>
    );
};

export default EditDetails;
