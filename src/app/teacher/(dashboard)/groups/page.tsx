import { GlobalBreadcrumb } from "@/components/shared/global-breadcrubm";
import ProtectWrapper from "@/features/auth/components/protect-routes";
import GroupsFilter from "@/features/groups/components/groups-filter";
import GroupList from "@/features/groups/components/groups-list";
import WeekdaysFilter from "@/features/weekdays/components/weekdays-filter";
import WeekdaysList from "@/features/weekdays/components/weekdays-list";
import { ADMIN_TITLE } from "@/lib/constants";
import { Users } from "@/lib/enums";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: ADMIN_TITLE("المجموعات"),
    description: "لوحة التحكم بالمجموعات",
};

const Page = () => {
    return (
        <ProtectWrapper role={Users.TEACHER}>
            <div className="container">
                <GlobalBreadcrumb type={Users.TEACHER} current="المجموعات" />
                <div className="flex md:flex-row flex-col-reverse gap-14">
                    <section className="flex-grow">
                        <h3 className="text-2xl font-bold">المجموعات</h3>
                        <p className="text-sm text-gray-500 mt-1 mb-5">يتم عرض المجموعات هنا</p>
                        <div className="my-4">
                            <GroupList />
                        </div>
                    </section>
                    <aside className="md:w-72 flex-shrink-0 ">
                        <h4 className="text-gray-500 mb-4">خيارات الفلتر</h4>
                        <GroupsFilter />
                    </aside>
                </div>
            </div>
        </ProtectWrapper>
    );
};

export default Page;
