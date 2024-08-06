"use client";
import ListItemIcon from "@/components/ui/list-item-icon";
import { IGetLevelDetails } from "@/interfaces/level";
import { BookCheck, BookCopy, Notebook, User, Users } from "lucide-react";
import React from "react";

const DetailsSide = ({ _count }: Pick<IGetLevelDetails, "_count">) => {
    return (
        <aside className="md:w-72 flex-shrink-0 ">
            <h4 className="text-gray-500 mb-4">معلومات</h4>

            <div className="flex items-center mb-4 gap-4">
                <ListItemIcon
                    Icon={Users}
                    label="المجموعات"
                    value={_count.groups.toString()}
                    wrapperClassname=" flex-1"
                />
                <ListItemIcon Icon={User} label="الطلاب" value={_count.students.toString()} wrapperClassname="flex-1" />
            </div>
            <ListItemIcon
                Icon={Notebook}
                label="الملاحظات"
                value={_count.note.toString()}
                wrapperClassname="mb-4 flex-1"
            />

            <ListItemIcon
                Icon={BookCopy}
                label="الوحدات"
                value={_count.units.toString()}
                wrapperClassname="mb-4 flex-1"
            />
            <ListItemIcon
                Icon={BookCheck}
                label="الاختبارات"
                value={_count.quizes.toString()}
                wrapperClassname="mb-4 flex-1"
            />
        </aside>
    );
};

export default DetailsSide;
