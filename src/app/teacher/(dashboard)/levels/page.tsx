import { GlobalBreadcrumb } from "@/components/shared/global-breadcrubm";
import ProtectWrapper from "@/features/auth/components/protect-routes";
import LevelFilter from "@/features/level/components/level-filter";
import LevelsList from "@/features/level/components/levels-list";
import { ADMIN_TITLE } from "@/lib/constants";
import { Users } from "@/lib/enums";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: ADMIN_TITLE("المراحل الدراسية"),
    description: "لوحة التحكم بالمراحل الدراسية",
};

const Page = () => {
    return (
        <ProtectWrapper role={Users.TEACHER}>
            <div className="container">
                <GlobalBreadcrumb type={Users.TEACHER} current="المراحل الدراسية" />
                <div className="flex md:flex-row flex-col-reverse gap-14">
                    <section className="flex-grow">
                        <h3 className="text-2xl font-bold">المراحل الدراسية</h3>
                        <p className="text-sm text-gray-500 mt-1 mb-5">يتم عرض المراحل الدراسيه هنا</p>
                        <div className="my-4">
                            <LevelsList />
                        </div>
                    </section>
                    <aside className="md:w-72 flex-shrink-0 ">
                        <h4 className="text-gray-500 mb-4">خيارات الفلتر</h4>
                        <LevelFilter />
                    </aside>
                </div>
            </div>
        </ProtectWrapper>
    );
};

export default Page;
