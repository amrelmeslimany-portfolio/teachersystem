import ProtectWrapper from "@/features/auth/components/protect-routes";
import LevelDetails from "@/features/level/components/level-details";
import { ADMIN_TITLE } from "@/lib/constants";
import { Users } from "@/lib/enums";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: ADMIN_TITLE("الفصول الدراسية"),
    description: "لوحة التحكم بالفصول الدراسية",
};

const Page = () => {
    return (
        <ProtectWrapper role={Users.TEACHER}>
            <LevelDetails />
        </ProtectWrapper>
    );
};

export default Page;
