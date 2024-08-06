import { BreadcrumbItemProp, GlobalBreadcrumb } from "@/components/shared/global-breadcrubm";
import ProtectWrapper from "@/features/auth/components/protect-routes";
import LevelForm from "@/features/level/components/level-form";
import TermForm from "@/features/term/components/term-form/term-from";
import { ADMIN_TITLE } from "@/lib/constants";
import { Users } from "@/lib/enums";
import { Routes } from "@/lib/routes";
import { Metadata } from "next";
import React from "react";

const breadcrumbs: BreadcrumbItemProp[] = [
    {
        title: "المراحل الدراسية",
        href: Routes.teacher.terms.home,
    },
];

export const metadata: Metadata = {
    title: ADMIN_TITLE("اضافة مرحله دراسية "),
    description: "اضافة مرحله دراسيه جديده",
};

const Page = () => {
    return (
        <ProtectWrapper role={Users.TEACHER}>
            <div className="container">
                <GlobalBreadcrumb type={Users.TEACHER} current="اضافة" items={breadcrumbs} />
                <h3 className="text-2xl font-bold">اضافه مرحله دراسيه </h3>
                <p className="text-sm text-gray-500 mt-1 mb-5">يمكنك اضافه مرحله دراسيه بملئ هذة البيانات</p>
                <div className="my-4">
                    {/* <TermForm /> */}
                    <LevelForm />
                </div>
            </div>
        </ProtectWrapper>
    );
};

export default Page;
