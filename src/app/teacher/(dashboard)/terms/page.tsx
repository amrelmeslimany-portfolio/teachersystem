import { GlobalBreadcrumb } from "@/components/shared/global-breadcrubm";
import { Table } from "@/components/ui/table";
import ProtectWrapper from "@/features/auth/components/protect-routes";
import TermFilter from "@/features/term/components/term-filter";
import TermList from "@/features/term/components/term-list";
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
            <div className="container">
                <GlobalBreadcrumb type={Users.TEACHER} current="الفصول الدراسية" />
                <div className="flex md:flex-row flex-col-reverse gap-14">
                    <section className="flex-grow">
                        <h3 className="text-2xl font-bold">الفصول الدراسية</h3>
                        <p className="text-sm text-gray-500 mt-1 mb-5">يتم عرض الفصول الدراسيه هنا</p>
                        <div className="my-4">
                            <TermList />
                        </div>
                    </section>
                    <aside className="md:w-72 flex-shrink-0 ">
                        <h4 className="text-gray-500 mb-4">خيارات الفلتر</h4>
                        <TermFilter />
                    </aside>
                </div>
            </div>
        </ProtectWrapper>
    );
};

export default Page;
