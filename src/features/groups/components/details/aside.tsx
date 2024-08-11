"use client";
import ListItemIcon from "@/components/ui/list-item-icon";
import { IGroupDetails } from "@/interfaces/groups";
import { DATE_SETTINGS } from "@/lib/constants";
import { Routes } from "@/lib/routes";
import { format } from "date-fns";
import { CalendarClock, Clock9, SquareStack, User } from "lucide-react";

import React from "react";

const DetailsSide = ({
    _count,
    createdAt,
    level,
    updatedAt,
}: Pick<IGroupDetails, "_count" | "level" | "createdAt" | "updatedAt">) => {
    return (
        <aside className="md:w-72 flex-shrink-0 space-y-4">
            <h4 className="text-gray-500 mb-4">معلومات</h4>
            <ListItemIcon
                Icon={SquareStack}
                label="المرحله الدراسيه"
                value={level.title}
                href={Routes.teacher.levels.home + `/${level.id}`}
                wrapperClassname=" flex-1"
            />
            <ListItemIcon Icon={User} label="الطلاب" value={_count.students.toString()} wrapperClassname=" flex-1" />
            <ListItemIcon
                Icon={Clock9}
                label="اخر تحديث"
                value={format(updatedAt, "HH:MM aa . LLLL dd, y", DATE_SETTINGS)}
                wrapperClassname=" flex-1"
            />
            <ListItemIcon
                Icon={CalendarClock}
                label="تاريخ الانشاء"
                value={format(createdAt, "LLLL dd, y", DATE_SETTINGS)}
                wrapperClassname=" flex-1"
            />
        </aside>
    );
};

export default DetailsSide;
