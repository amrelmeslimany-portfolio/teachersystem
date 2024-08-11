import { IGroupDetails } from "@/interfaces/groups";
import { DATE_SETTINGS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import React from "react";

const TimeCards = ({ appointTime }: Pick<IGroupDetails, "appointTime">) => {
    const cardClassname = "bg-white dark:bg-white/5 p-2 rounded-md text-xl font-medium text-center shadow";
    return (
        <div className="grid grid-cols-3 gap-2">
            <span className={cn([cardClassname])}>{format(appointTime, "hh", DATE_SETTINGS)}</span>
            <span className={cn([cardClassname])}>{format(appointTime, "mm", DATE_SETTINGS)}</span>
            <span className={cn([cardClassname, "uppercase"])}>{format(appointTime, "aaa", DATE_SETTINGS)}</span>
        </div>
    );
};

export default TimeCards;
