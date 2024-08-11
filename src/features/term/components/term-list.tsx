"use client";

import React from "react";
import { StatusType, useGetTermsQuery } from "../term-api";
import LoadingLottie from "@/public/imgs/lottie/loader.json";
import EmptyImg from "@/public/imgs/lottie/empty-img.json";
import Lottie from "lottie-react";
import Error from "@/components/ui/error";
import { IError } from "@/interfaces/shared";
import TermItem from "./term-item";
import Link from "next/link";
import { Routes } from "@/lib/routes";
import { Plus } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { GlobalPagination } from "../../../components/shared/global-pagination";

const TermList = () => {
    const params = useSearchParams();

    const termsParams = {
        ...(params.has("status") ? { status: params.get("status") as StatusType } : {}),
        ...(params.has("page") ? { page: params.get("page") as string } : {}),
    };

    const { data, isFetching, isError, error } = useGetTermsQuery(termsParams);

    return (
        <div>
            {isFetching && <Lottie animationData={LoadingLottie} className="w-14 h-14 mx-auto my-4" />}
            {isError && <Error error={(error as IError).data.message} />}
            {!isFetching && data?.data.length == 0 && <Lottie animationData={EmptyImg} className="w-48 mx-auto h-48" />}
            {!isFetching && data && data.data.length > 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                    {data?.data.map((item) => (
                        <TermItem key={item.id} {...item} />
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

            <Link
                href={Routes.teacher.terms.add}
                className="bg-primary p-2.5  hover:bg-primary/90 transition-all fixed bottom-5 right-1/2 rounded-full flex items-center justify-center"
            >
                <Plus className="w-5 h-5 me-2  text-white " />
                <span className="text-white">اضافة فصل</span>
            </Link>
        </div>
    );
};

export default TermList;
