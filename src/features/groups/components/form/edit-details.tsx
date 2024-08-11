"use client";
import { BreadcrumbItemProp, GlobalBreadcrumb } from "@/components/shared/global-breadcrubm";
import { Users } from "@/lib/enums";
import React from "react";
import { Routes } from "@/lib/routes";
import Lottie from "lottie-react";
import LoadingLottie from "@/public/imgs/lottie/loader.json";
import Info from "@/components/ui/info";
import GroupForm from "@/features/groups/components/form";
import { useOneGroupQuery } from "../../groups-api";
import { IGetGroupOnly } from "@/interfaces/groups";

const breadcrumbs: BreadcrumbItemProp[] = [
    {
        title: "المجموعات الطلابية",
        href: Routes.teacher.groups.home,
    },
];

const EditDetails = ({ id }: { id: string }) => {
    const { data: group, isFetching, error } = useOneGroupQuery(id as any);
    if (isFetching) return <Lottie animationData={LoadingLottie} className="w-14 h-14 mx-auto my-4" />;
    if (!group || error)
        return <Info title="المجموعة غير موجودة" href={Routes.teacher.groups.home} backText="المجموعات" />;
    const { createdAt, updatedAt, students, ...groupForm } = group.data;
    return (
        <div className="container">
            <GlobalBreadcrumb type={Users.TEACHER} current={"تعديل"} items={breadcrumbs} />

            <p className="text-sm text-gray-500 mt-1 mb-5">يمكنك تعديل المجموعة بملئ هذة البيانات</p>
            <div className="my-4">
                <GroupForm group={groupForm as any} />
            </div>
        </div>
    );
};

export default EditDetails;
