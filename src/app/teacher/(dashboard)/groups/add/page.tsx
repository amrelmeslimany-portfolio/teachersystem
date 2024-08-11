import { BreadcrumbItemProp, GlobalBreadcrumb } from "@/components/shared/global-breadcrubm";
import ProtectWrapper from "@/features/auth/components/protect-routes";
import GroupForm from "@/features/groups/components/form";
import { ADMIN_TITLE } from "@/lib/constants";
import { Users } from "@/lib/enums";
import { Routes } from "@/lib/routes";
import { Metadata } from "next";
import React from "react";

const breadcrumbs: BreadcrumbItemProp[] = [
    {
        title: "المجموعات",
        href: Routes.teacher.groups.home,
    },
];

export const metadata: Metadata = {
    title: ADMIN_TITLE("اضافة مجموعة"),
    description: "اضافة مجموعة جديده ",
};

const Page = () => {
    return (
        <ProtectWrapper role={Users.TEACHER}>
            <div className="container">
                <GlobalBreadcrumb type={Users.TEACHER} current="اضافة" items={breadcrumbs} />
                <h3 className="text-2xl font-bold">اضافه مجموعة </h3>
                <p className="text-sm text-gray-500 mt-1 mb-5">يمكنك اضافه مجموعة بملئ هذة البيانات</p>
                <div className="my-4">
                    <GroupForm />
                </div>
            </div>
        </ProtectWrapper>
    );
};

export default Page;
