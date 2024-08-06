import ProtectWrapper from "@/features/auth/components/protect-routes";
import { ADMIN_TITLE } from "@/lib/constants";
import { Users } from "@/lib/enums";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: ADMIN_TITLE("الاختبارات"),
    description: "لوحة التحكم بالاختبارات",
};

const Page = () => {
    return (
        <ProtectWrapper role={Users.TEACHER}>
            <div className="container">
                <article>
                    <h3 className="text-2xl font-bold">الاختبارات</h3>
                </article>
            </div>
        </ProtectWrapper>
    );
};

export default Page;
