"use client";

import { useToast } from "@/components/ui/use-toast";
import { IStudent } from "@/interfaces/student";
import { errorHandling } from "@/lib/error";
import { Routes } from "@/lib/routes";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { CircleX, Loader, MailCheck } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import React, { Fragment, useEffect } from "react";
import { useLazyCheckVerifyEmailQuery } from "../auth-api";
import { selectUser, verifyEmailAction } from "../auth-slice";
import IconAvatar from "@/components/ui/icon-avatar";
import { cn } from "@/lib/utils";

const CheckEmailVerified = () => {
    const user = useAppSelector(selectUser) as IStudent;
    const dispatch = useAppDispatch();
    const router = useRouter();
    const search = useSearchParams();
    const token = search.get("token");
    const { toast } = useToast();
    const [checkVerifyQuery, { isFetching }] = useLazyCheckVerifyEmailQuery();

    useEffect(() => {
        if (!token) router.push("/");

        const handleRequest = async () => {
            try {
                const response = await checkVerifyQuery({ token, id: user.id }).unwrap();
                if (response.data.isVerified) return dispatch(verifyEmailAction(true));
            } catch (error) {
                errorHandling(error, toast);
                // router.back()
            }
        };

        handleRequest();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (user.isEmailVerified) return router.push(Routes.student.dashboard);
        }, 4000);

        return () => {
            clearTimeout(timer);
        };
    }, [user, router]);

    if (isFetching) return <Loader className="mt-2 animate-spin w-5 h-5 " />;

    return (
        <Fragment>
            <div className="text-center">
                <IconAvatar
                    icon={React.createElement(MailCheck, {
                        className: cn(["w-14 h-14", "text-green-600"]),
                    })}
                    wrapperClassName={cn(["w-24 h-24 mx-auto", "bg-green050"])}
                />

                <article className="my-4">
                    <p>تم تفعيل الحساب الخاص بك بنجاح</p>
                </article>
            </div>
        </Fragment>
    );
};

export default CheckEmailVerified;
