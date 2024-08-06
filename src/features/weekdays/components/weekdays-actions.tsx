"use client";

import UpdateDeleteActions from "@/components/shared/update-delete-actions";
import { Routes } from "@/lib/routes";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
import { toast } from "@/components/ui/use-toast";
import { useDeleteWeekdaysMutation } from "../weekdays-api";

const WeekdaysActions = ({ id, title, isBack }: { id: string; title: string; isBack?: boolean }) => {
    const router = useRouter();

    const [deleteRequest, { isLoading }] = useDeleteWeekdaysMutation();

    const onDelete = useCallback(async () => {
        try {
            await deleteRequest(id as string).unwrap();
            toast({ title: "تم الحذف بنجاح", className: "bg-green-700 text-white py-4" });
            isBack && router.push(Routes.teacher.weekdays.home);
        } catch (error: any) {
            toast({ title: "لم يتم الحذف" });
        }
    }, [toast, isBack, router, deleteRequest]);

    return (
        <UpdateDeleteActions
            isLoading={isLoading}
            onDelete={onDelete}
            title={title}
            updateHref={`${Routes.teacher.weekdays.home}/${id}/edit`}
            id={id}
            deleteDescription="يجب ان تتأكد من المجاميع والطلاب والوحدات لانه سيتم حذف جميعهم مع حذف هذه المرحله. هل انت متاكد من الحذف ؟"
        />
    );
};

export default WeekdaysActions;
