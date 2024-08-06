import { BreadcrumbItemProp, GlobalBreadcrumb } from "@/components/shared/global-breadcrubm";
import ProtectWrapper from "@/features/auth/components/protect-routes";
import WeekdaysForm from "@/features/weekdays/components/form";
import { ADMIN_TITLE } from "@/lib/constants";
import { Users } from "@/lib/enums";
import { Routes } from "@/lib/routes";
import { Metadata } from "next";
import React from "react";

const breadcrumbs: BreadcrumbItemProp[] = [
    {
        title: "الجداول الزمنية",
        href: Routes.teacher.weekdays.home,
    },
];

export const metadata: Metadata = {
    title: ADMIN_TITLE("اضافة جدول زمني جديد"),
    description: "اضافة جدول زمني",
};

const Page = () => {
    return (
        <ProtectWrapper role={Users.TEACHER}>
            <div className="container">
                <GlobalBreadcrumb type={Users.TEACHER} current="اضافة" items={breadcrumbs} />
                <h3 className="text-2xl font-bold">اضافه جدول زمني </h3>
                <p className="text-sm text-gray-500 mt-1 mb-5">يمكنك اضافه جدول زمني بملئ هذة البيانات</p>
                <div className="my-4">
                    <WeekdaysForm />
                </div>
            </div>
        </ProtectWrapper>
    );
};

export default Page;
