import ProtectWrapper from "@/features/auth/components/protect-routes";
import TermDetails from "@/features/term/components/term-details";
import { ADMIN_TITLE } from "@/lib/constants";
import { Users } from "@/lib/enums";
import { API_SERVER } from "@/redux/api-inject";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: ADMIN_TITLE("الفصول الدراسية"),
    description: "لوحة التحكم بالفصول الدراسية",
};

const Page = () => {
    return (
        <ProtectWrapper role={Users.TEACHER}>
            <TermDetails />
        </ProtectWrapper>
    );
};

export default Page;
