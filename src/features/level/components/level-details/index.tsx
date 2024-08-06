"use client";

import { useParams } from "next/navigation";
import React, { useMemo } from "react";
import { BreadcrumbItemProp, GlobalBreadcrumb } from "@/components/shared/global-breadcrubm";
import { Status, Users } from "@/lib/enums";
import Lottie from "lottie-react";
import LoadingLottie from "@/public/imgs/lottie/loader.json";
import Error from "@/components/ui/error";
import { IError } from "@/interfaces/shared";
import { Routes } from "@/lib/routes";
import { cn, statusToAr } from "@/lib/utils";
import { AppColors } from "@/lib/theme";
import { CalendarIcon, Flame, SquareStack } from "lucide-react";
import Link from "next/link";
import ListItemIcon from "@/components/ui/list-item-icon";
import DefaultImg from "@/public/imgs/default.png";

import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { arEG } from "date-fns/locale";

import Head from "next/head";
import { useGetLevelQuery } from "../../level-api";
import LevelActions from "../level-actions";
import Image from "next/image";
import SegmentTitle from "@/features/term/components/segment-title";
import DetailsSide from "./details-side";
import { CarouselList } from "./carousel-list";
import { CardItemProps } from "./card-item";

const breadcrumbs: BreadcrumbItemProp[] = [
    {
        title: "المراحل الدراسية",
        href: Routes.teacher.levels.home,
    },
];

const LevelDetails = () => {
    const { id } = useParams();
    const { data, isFetching, error } = useGetLevelQuery(id as any);

    if (isFetching) return <Lottie animationData={LoadingLottie} className="w-14 h-14 mx-auto my-4" />;

    if (!data || error) return <Error error="غير موجود هذة المرحله" />;

    return (
        <div className="container">
            <Head>
                <title>{data.data.title}</title>
            </Head>
            <GlobalBreadcrumb type={Users.TEACHER} items={breadcrumbs} current={data?.data.title} />
            <div className="flex md:flex-row flex-col gap-14">
                <div className="max-w-full flex-grow md:w-[70%]">
                    <div className="flex gap-2 justify-between">
                        <h3 className="text-2xl font-bold">{data.data.title}</h3>
                        <LevelActions title={data.data.title} isBack id={id as string} />
                    </div>

                    <div className="w-full h-[500px]">
                        <Image
                            src={data.data.cover || DefaultImg}
                            alt={data.data.title}
                            width={500}
                            priority
                            height={500}
                            className="mt-4 w-full h-full object-cover"
                        />
                    </div>
                    <SegmentTitle label="الوصف" className="my-4">
                        {data.data.description}
                    </SegmentTitle>

                    <CarouselList
                        label="الاختبارات"
                        className="mb-5 justify-start"
                        list={data.data.quizes.map(
                            (item) => ({ ...item, href: Routes.teacher.quizzes.home, isImage: false } as CardItemProps)
                        )}
                        href={Routes.teacher.quizzes.home}
                    />
                    <CarouselList
                        label="المجموعات"
                        className="mb-4 justify-start"
                        list={data.data.groups.map((item) => ({ ...item, href: Routes.teacher.groups.home }))}
                        href={Routes.teacher.groups.home}
                    />
                    <CarouselList
                        label="الطلاب"
                        className="mb-4 justify-start"
                        list={data.data.students.map(
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
                    <CarouselList
                        label="الفصول الدراسيه"
                        className="mb-4 justify-start"
                        list={data.data.terms.map(
                            (item) =>
                                ({
                                    ...item,
                                    isImage: false,
                                    href: Routes.teacher.terms.home,
                                } as CardItemProps)
                        )}
                        href={Routes.teacher.terms.home}
                    />
                    <CarouselList
                        label="الملاحظات"
                        className="mb-4 justify-start"
                        list={data.data.note.map(
                            (item) =>
                                ({
                                    ...item,
                                    isImage: false,
                                    href: Routes.teacher.notes.home,
                                } as CardItemProps)
                        )}
                        href={Routes.teacher.notes.home}
                    />
                    {/* FIXME */}
                </div>
                <DetailsSide _count={data.data._count} />
            </div>
        </div>
    );
};

export default LevelDetails;
