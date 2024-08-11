"use client";

import React from "react";

import Lottie from "lottie-react";
import LoadingLottie from "@/public/imgs/lottie/loader.json";
import Error from "@/components/ui/error";
import EmptyImg from "@/public/imgs/lottie/empty-img.json";
import { IError } from "@/interfaces/shared";
import { GlobalPagination } from "@/components/shared/global-pagination";
import FloatingButton from "@/components/ui/floating-button";
import { Routes } from "@/lib/routes";
import { useSearchParams } from "next/navigation";
import { useAllGroupsQuery } from "../groups-api";
import GroupItem from "./groups-item";

const GroupList = () => {
    const searchParams = useSearchParams();

    const params = searchParams.entries().map(([key, value]) => ({ [key]: value }));

    const { data, isFetching, error, isError } = useAllGroupsQuery(Object.assign({}, ...(params as any)));

    if (isFetching) return <Lottie animationData={LoadingLottie} className="w-14 h-14 mx-auto my-4" />;

    if (isError) return <Error error={(error as IError)?.data?.message || "هناك مشكله"} />;

    if (!isFetching && data?.data.length == 0) return <Lottie animationData={EmptyImg} className="w-48 mx-auto h-48" />;

    console.log(data);

    return (
        <div>
            {!isFetching && data && data.data.length > 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 ">
                    {data?.data.map((item) => (
                        <GroupItem key={item.id} {...item} />
                    ))}
                </div>
            )}

            {!isFetching && data && (
                <GlobalPagination
                    currentPage={data.metadata.page}
                    totalPages={data.metadata.total / data.metadata.limit}
                    isNext={data.metadata.hasNext}
                    isPrevious={data.metadata.hasPrevious}
                />
            )}

            <FloatingButton href={Routes.teacher.groups.add} label="اضافة مجموعة" />
        </div>
    );
};

export default GroupList;
