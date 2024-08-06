"use client";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import React from "react";
import DefaultImg from "@/public/imgs/default.png";
import LevelCounter from "./counter";
import LevelActions from "./level-actions";
import { IGetLevel } from "@/interfaces/level";
import Link from "next/link";
import { Routes } from "@/lib/routes";
import CardImage from "@/components/ui/card-image";

const LevelItem = ({ _count, cover, description, id, title }: IGetLevel) => {
    return (
        <Card className="p-0.5  group bg-primary/5 border-none">
            <CardImage
                src={cover}
                className="h-[150px]"
                content={
                    <ul className="flex  items-center justify-between">
                        <LevelCounter label="المجاميع" value={_count.groups} />
                        <LevelCounter label="الطلاب" value={_count.students} />
                        <LevelCounter label="الوحدات" value={_count.units} />
                    </ul>
                }
            />
            <CardHeader className="p-4">
                <Link href={Routes.teacher.levels.home + "/" + id}>
                    <CardTitle className="text-lg line-clamp-2">{title}</CardTitle>
                </Link>
                <CardDescription className="line-clamp-2">{description}</CardDescription>
            </CardHeader>
            <CardFooter className="p-4 justify-center border-t">
                <LevelActions title={title} id={id} />
            </CardFooter>
        </Card>
    );
};

export default LevelItem;
