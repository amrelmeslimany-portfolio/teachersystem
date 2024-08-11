import ProtectWrapper from "@/features/auth/components/protect-routes";
import GroupDetails from "@/features/groups/components/details";
import { ADMIN_TITLE } from "@/lib/constants";
import { Users } from "@/lib/enums";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: ADMIN_TITLE("الجداول الزمنية"),
    description: "لوحة التحكم بالجداول الزمنية",
};

const Page = () => {
    return (
        <ProtectWrapper role={Users.TEACHER}>
            <GroupDetails />
        </ProtectWrapper>
    );
};

export default Page;
