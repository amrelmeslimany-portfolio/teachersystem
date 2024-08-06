"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { IGetWeekdays } from "@/interfaces/weekdays";
import { WEEKDAYS_TRANSLATION } from "@/lib/constants";
import { Check, X } from "lucide-react";
import React from "react";
import WeekdaysActions from "./weekdays-actions";
import Link from "next/link";
import { Routes } from "@/lib/routes";
import WeekdaysCheckedTabel from "./weekdays-checked-tabel";

const WeekdaysItem = (props: IGetWeekdays) => {
    return (
        <Card className="p-0.5  group bg-primary/5 border-none">
            <Link href={Routes.teacher.weekdays.home + "/" + props.id} className="group">
                <CardContent className="p-4 grid grid-cols-3 gap-3 group-hover:shadow-lg transition-shadow">
                    <WeekdaysCheckedTabel {...props} />
                </CardContent>
            </Link>
            <CardFooter className="p-4 justify-center border-t">
                <WeekdaysActions title={props.id} id={props.id} />
            </CardFooter>
        </Card>
    );
};

export default WeekdaysItem;
