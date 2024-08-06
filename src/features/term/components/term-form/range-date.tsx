"use client";

import { cn } from "@/lib/utils";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { arEG } from "date-fns/locale";
import { CalendarIcon, ArrowLeft } from "lucide-react";
import React from "react";
import { ControllerRenderProps } from "react-hook-form";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";

type Props = { field: ControllerRenderProps<any> };

const RangeDate = ({ field }: Props) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-full justify-start text-left font-normal",
                        !field.value && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="me-2 h-4 w-4" />
                    {field.value ? (
                        field.value.to ? (
                            <>
                                {format(field.value.from, "y/LL/dd", { locale: arEG })}
                                <ArrowLeft className="w-3 h-3 mx-2" />
                                {format(field.value.to, "y/LL/dd", { locale: arEG })}
                            </>
                        ) : (
                            format(field.value.from, "y/LL/dd", { locale: arEG })
                        )
                    ) : (
                        <span>اختر المدة الزمنية</span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    locale={arEG}
                    mode="range"
                    dir="rtl"
                    selected={field.value}
                    onSelect={field.onChange}
                    numberOfMonths={2}
                />
            </PopoverContent>
        </Popover>
    );
};

export default RangeDate;
