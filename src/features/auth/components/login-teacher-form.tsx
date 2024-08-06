"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schema/auth";
import React, { useEffect, useLayoutEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useLoginMutation, useTeacherLoginMutation } from "@/features/auth/auth-api";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import InputController from "@/components/ui/input-controller";
import { errorHandling } from "@/lib/error";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { loginAction, selectUser } from "../auth-slice";
import { Users } from "@/lib/enums";
import { useRouter } from "next/navigation";
import { Routes } from "@/lib/routes";

type loginSchemaType = z.infer<typeof loginSchema>;

const LoginTeacherForm = () => {
    const [login, { isLoading }] = useTeacherLoginMutation();
    const router = useRouter();
    const { toast } = useToast();
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);

    const form = useForm<loginSchemaType>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: "", password: "" },
    });

    const onLogin = async (values: loginSchemaType) => {
        try {
            const response = await login(values).unwrap();
            dispatch(loginAction({ ...response, role: Users.TEACHER }));
            toast({ title: "تم تسجيل الدخول بنجاح", className: "bg-green-700 text-white py-4" });
        } catch (error: any) {
            errorHandling(error, toast, form);
        }
    };

    useLayoutEffect(() => {
        if (user?.role == Users.STUDENT) {
            return router.replace(Routes.student.dashboard);
        } else if (user?.role == Users.TEACHER) return router.replace(Routes.teacher.home);
    }, [user]);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onLogin)} className="space-y-4 max-w-md mx-auto">
                <FormField
                    disabled={isLoading}
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <InputController
                            label="البريد الالكتروني"
                            input={<Input placeholder="البريد الالكتروني" {...field} />}
                        />
                    )}
                />
                <FormField
                    disabled={isLoading}
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <InputController
                            label="كلمة المرور"
                            input={<Input type="password" placeholder="****************" {...field} />}
                        />
                    )}
                />

                <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading && <Loader2 className="me-2 h-4 w-4 animate-spin" />}
                    تسجيل الدخول
                </Button>
            </form>
        </Form>
    );
};

export default LoginTeacherForm;
