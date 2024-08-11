import { IGetWeekdays } from "@/interfaces/weekdays";
import { WEEKDAYS_TRANSLATION } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";
import React from "react";

export type OnlyDaysType = Omit<IGetWeekdays, "id"> & { className?: string };

const WeekdaysCheckedTabel = (props: OnlyDaysType) => {
    return Object.entries(WEEKDAYS_TRANSLATION).map(([key, value]) => (
        <div className={cn(["text-center", props.className])} key={key}>
            <span>{value}</span>
            {Object.entries(props).map(([dayKey, dayValue]) => {
                if (dayKey === key && dayValue) return <Check className="text-green-400 mx-auto mt-2" key={dayKey} />;
                else if (dayKey === key && !dayValue) return <X className="text-red-400 mx-auto mt-2" key={dayKey} />;
            })}
        </div>
    ));
};

export default WeekdaysCheckedTabel;
