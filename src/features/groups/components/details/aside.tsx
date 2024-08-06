"use client";
import ListItemIcon from "@/components/ui/list-item-icon";
import { IWeekdaysDetails } from "@/interfaces/weekdays";
import { Users } from "lucide-react";

import React from "react";

const DetailsSide = ({ _count }: Pick<IWeekdaysDetails, "_count">) => {
    return (
        <aside className="md:w-72 flex-shrink-0 ">
            <h4 className="text-gray-500 mb-4">معلومات</h4>

            <ListItemIcon Icon={Users} label="المجموعات" value={_count.groups.toString()} wrapperClassname=" flex-1" />
        </aside>
    );
};

export default DetailsSide;
