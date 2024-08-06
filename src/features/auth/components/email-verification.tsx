"use client";
import { useToast } from "@/components/ui/use-toast";
import { IStudent } from "@/interfaces/student";
import { ErrorsMessage } from "@/lib/enums";
import { errorHandling } from "@/lib/error";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React, { Fragment } from "react";
import { useLazyVerifyEmailQuery } from "../auth-api";
import { selectUser, verifyEmailAction } from "../auth-slice";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { Routes } from "@/lib/routes";

const EmailVerifiecation = () => {
    const user = useAppSelector(selectUser) as IStudent;
    const dispatch = useAppDispatch();
    const [verifyEmail, { isFetching }] = useLazyVerifyEmailQuery();
    const { toast } = useToast();
    const router = useRouter();

    const onSend = async () => {
        try {
            const response = await verifyEmail(user.id).unwrap();
            toast({ title: response.data, description: "قم بمراجعة الرسائل في الايميل الخاص بك", className: "py-4" });
        } catch (ex: any) {
            if (ex.data.message == ErrorsMessage.EMAIL_ALREADY_VERIFIED) dispatch(verifyEmailAction(true));
            errorHandling(ex, toast);
        }
    };

    React.useLayoutEffect(() => {
        if (user?.isEmailVerified) router.push(Routes.student.dashboard);
    }, [user]);

    return (
        <Fragment>
            <article className="my-4">
                <p>سيتم ارسال رسالة الي هذا البريد الالكتروني</p>
                <p className="mb-2">تحتوي الرساله علي رابط قم بالضغط عليه للتأكيد</p>
                <b>{user.email}</b>
            </article>

            <Button onClick={onSend} disabled={isFetching}>
                {isFetching && <Loader className="animate-spin w-4 h-4 me-2" />}
                ارسال الرابط
            </Button>
        </Fragment>
    );
};

export default EmailVerifiecation;
