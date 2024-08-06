"use client";

import React, { useCallback } from "react";
import { useDeleteTermMutation } from "../term-api";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { Routes } from "@/lib/routes";
import UpdateDeleteActions from "@/components/shared/update-delete-actions";

const TermActions = ({ id, title, isBack }: { id: string; title: string; isBack?: boolean }) => {
    const router = useRouter();

    const [deleteRequest, { isLoading }] = useDeleteTermMutation();

    const onDelete = useCallback(async () => {
        try {
            await deleteRequest(id as string).unwrap();
            toast({ title: "تم الحذف بنجاح", className: "bg-green-700 text-white py-4" });
            isBack && router.push(Routes.teacher.terms.home);
        } catch (error: any) {
            toast({ title: "لم يتم الحذف" });
        }
    }, [toast, isBack, router, deleteRequest]);

    return (
        <UpdateDeleteActions
            deleteDescription=" كن علي علم بانه سيتم حذف الفصل الدراسي هذا ما يحتويه من ملاحظات الوحدات او اي شئ مبني
                                عليه. فهل انت متأكد من الحذف ؟"
            id={id}
            title={title}
            isLoading={isLoading}
            onDelete={onDelete}
            updateHref={Routes.teacher.terms.home + "/" + id + "/edit"}
        />
    );
};

export default TermActions;
