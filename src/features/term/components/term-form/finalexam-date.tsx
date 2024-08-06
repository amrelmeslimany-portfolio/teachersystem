"use client";

import { cn } from "@/lib/utils";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { arEG } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import React from "react";
import { ControllerRenderProps } from "react-hook-form";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";

type Props = { field: ControllerRenderProps<any> };

const FinalExamDate = ({ field }: Props) => {
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
                        format(field.value, "y/LL/dd", { locale: arEG })
                    ) : (
                        <span>اختر موعد الاختبار النهائي </span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    locale={arEG}
                    dir="rtl"
                    selected={field.value}
                    defaultMonth={field.value}
                    mode="single"
                    onSelect={field.onChange}
                />
            </PopoverContent>
        </Popover>
    );
};

export default FinalExamDate;
