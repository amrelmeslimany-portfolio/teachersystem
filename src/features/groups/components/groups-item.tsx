"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import Link from "next/link";
import { Routes } from "@/lib/routes";
import { IGetGroup } from "@/interfaces/groups";
import GroupsActions from "./groups-actions";
import CardImage from "@/components/ui/card-image";
import LinkActionsFooter from "@/components/ui/link-actions-footer";
import SegmentTitle from "@/features/term/components/segment-title";
import { format, getHours, getMinutes } from "date-fns";
import { DATE_SETTINGS } from "@/lib/constants";
import LevelCounter from "@/features/level/components/counter";

const GroupItem = ({ _count, appointTime, cover, id, level, title }: IGetGroup) => {
    return (
        <Card className="p-0.5  group bg-primary/5 border-none">
            <CardImage
                src={cover}
                className="h-[150px]"
                content={
                    <ul className="grid place-content-center">
                        <LevelCounter label="الطلاب" value={_count.students} />
                    </ul>
                }
            />
            <CardHeader className="p-4">
                <Link href={Routes.teacher.groups.home + "/" + id}>
                    <CardTitle className="text-lg line-clamp-2">{title}</CardTitle>
                </Link>
            </CardHeader>

            <CardContent className="p-4 border-t">
                <SegmentTitle label="الموعد">
                    <div className="grid grid-cols-3 gap-2">
                        <span className="bg-white p-2 rounded-md text-lg font-medium text-center">
                            {format(appointTime, "hh", DATE_SETTINGS)}
                        </span>
                        <span className="bg-white p-2 rounded-md text-lg font-medium text-center">
                            {format(appointTime, "mm", DATE_SETTINGS)}
                        </span>
                        <span className="bg-white p-2 rounded-md uppercase text-lg font-medium text-center">
                            {format(appointTime, "aaa", DATE_SETTINGS)}
                        </span>
                    </div>
                </SegmentTitle>
            </CardContent>
            <LinkActionsFooter
                label="المرحلة"
                href={`${Routes.teacher.levels.home}/${level.id}`}
                title={level.title}
                actions={<GroupsActions title={title} id={id} />}
            />
        </Card>
    );
};

export default GroupItem;
