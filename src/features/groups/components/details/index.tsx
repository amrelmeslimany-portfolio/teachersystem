"use client";

import { useParams } from "next/navigation";
import React from "react";
import { BreadcrumbItemProp, GlobalBreadcrumb } from "@/components/shared/global-breadcrubm";
import { Users } from "@/lib/enums";
import Lottie from "lottie-react";
import LoadingLottie from "@/public/imgs/lottie/loader.json";
import Error from "@/components/ui/error";
import { Routes } from "@/lib/routes";
import DefaultImg from "@/public/imgs/default.png";
import Head from "next/head";
import Image from "next/image";
import SegmentTitle from "@/features/term/components/segment-title";
import { useOneGroupQuery } from "../../groups-api";
import GroupsActions from "../groups-actions";
import { imgSrc } from "@/lib/utils";
import { CarouselList } from "@/features/level/components/level-details/carousel-list";
import { CardItemProps } from "@/features/level/components/level-details/card-item";
import WeekdaysCheckedTabel from "@/features/weekdays/components/weekdays-checked-tabel";
import Link from "next/link";
import TimeCards from "../time-cards";
import { CardContent } from "@/components/ui/card";
import { format, getHours, getTime } from "date-fns";
import DetailsSide from "./aside";

const breadcrumbs: BreadcrumbItemProp[] = [
    {
        title: "المجموعات الطلابيه",
        href: Routes.teacher.groups.home,
    },
];

const GroupDetails = () => {
    const { id } = useParams();
    const { data, isFetching, error } = useOneGroupQuery(id as any);

    if (isFetching) return <Lottie animationData={LoadingLottie} className="w-14 h-14 mx-auto my-4" />;

    if (!data || error) return <Error error="غير موجود هذة المجموعة" />;

    const { data: group } = data;

    console.log(group);

    return (
        <div className="container">
            <Head>
                <title>{group.title}</title>
            </Head>
            <GlobalBreadcrumb type={Users.TEACHER} items={breadcrumbs} current={group.title} />
            <div className="flex md:flex-row flex-col gap-14">
                <div className="max-w-full flex-grow md:w-[70%]">
                    <div className="flex gap-2 justify-between">
                        <h3 className="text-2xl font-bold">{group.title}</h3>
                        <GroupsActions title={group.title} isBack id={id as string} />
                    </div>

                    <div className="w-full h-[500px]">
                        <Image
                            src={imgSrc(group.cover, DefaultImg)}
                            alt={group.title}
                            width={500}
                            priority
                            height={500}
                            className="mt-4 w-full h-full object-cover"
                        />
                    </div>
                    <SegmentTitle label="الوصف" className="my-4">
                        {group.description}
                    </SegmentTitle>
                    <SegmentTitle
                        label="الجدول الزمني"
                        href={Routes.teacher.weekdays.home + `/${group.weekdays.id}`}
                        className="my-4"
                    >
                        <div className="flex gap-4 items-center flex-wrap">
                            <WeekdaysCheckedTabel className="flex-1" {...group.weekdays} />
                        </div>
                    </SegmentTitle>
                    <SegmentTitle label="الموعد" className="my-4 ">
                        <TimeCards appointTime={group.appointTime} />
                    </SegmentTitle>
                    <SegmentTitle label="المده" className="my-4  ">
                        <div className="grid grid-cols-2 gap-2 ">
                            <CardContent className="text-center p-2 shadow rounded-lg">
                                <p className="text-xl font-medium">{group.duration.split(":")[0]}</p>
                                <span className="text-gray-400 text-xs block ">ساعه</span>
                            </CardContent>
                            <CardContent className="text-center p-2 shadow rounded-lg">
                                <p className="text-xl font-medium">{group.duration.split(":")[1]}</p>
                                <span className="text-gray-400 text-xs block ">دقيقة</span>
                            </CardContent>
                        </div>
                    </SegmentTitle>

                    <CarouselList
                        label="الطلاب"
                        className="mb-4 justify-start"
                        list={group.students.map(
                            (item) =>
                                ({
                                    id: item.id,
                                    cover: item.picture,
                                    title: `${item.firstname} ${item.fathername}`,
                                    href: Routes.teacher.students.home,
                                    isUser: true,
                                } as CardItemProps)
                        )}
                        href={Routes.teacher.students.home}
                    />
                </div>
                <DetailsSide
                    createdAt={group.createdAt}
                    updatedAt={group.updatedAt}
                    level={group.level}
                    _count={group._count}
                />
            </div>
        </div>
    );
};

export default GroupDetails;
