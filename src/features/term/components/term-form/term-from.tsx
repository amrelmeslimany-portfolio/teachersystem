"use client";

import { TermSchema } from "@/schema/term";
import React from "react";
import { z } from "zod";
import { useAddTermMutation, useUpdateTermMutation } from "../../term-api";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import InputController from "@/components/ui/input-controller";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { addDays, addMonths } from "date-fns";
import { Textarea } from "@/components/ui/textarea";
import SelectLevel from "./select-level";
import RangeDate from "./range-date";
import FinalExamDate from "./finalexam-date";
import { errorHandling } from "@/lib/error";
import { Routes } from "@/lib/routes";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TermOnlyType } from "@/interfaces/term";

export type TermSchemaType = z.infer<typeof TermSchema>;

type Props = { term?: TermOnlyType };

const TermForm = ({ term }: Props) => {
    const [requestAdd, { isLoading }] = useAddTermMutation();
    const [requestUpdate, { isLoading: isUpdateLoading }] = useUpdateTermMutation();
    const router = useRouter();
    const { toast } = useToast();

    const form = useForm<TermSchemaType>({
        resolver: zodResolver(TermSchema),
        defaultValues: {
            title: term?.title || "",
            description: term?.description || "",
            levelId: term?.level.id || "",
            status: (term?.status as any) || undefined,
            rangeDate: term
                ? { from: new Date(term.startDate), to: new Date(term.endDate) }
                : { from: addDays(new Date(), 1), to: addMonths(new Date(), 2) },
            finalExamDate: term?.finalExamDate ? new Date(term?.finalExamDate) : undefined,
        },
    });

    const onSubmit = async ({ rangeDate, ...values }: TermSchemaType) => {
        const data = {
            ...values,
            finalExamDate: values.finalExamDate?.toISOString(),
        };

        try {
            if (term) await requestUpdate({ id: term.id, term: data }).unwrap();
            else await requestAdd(data).unwrap();
            toast({ title: `تم الحفظ بنجاح`, className: "bg-green-700 text-white py-4" });
            router.push(Routes.teacher.terms.home);
        } catch (error: any) {
            errorHandling(error, toast, form);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className=" grid grid-cols-1 lg:grid-cols-2 gap-5">
                <div className="space-y-4 ">
                    <FormField
                        disabled={isLoading}
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <InputController label="الاسم" input={<Input placeholder="ادخل الاسم" {...field} />} />
                        )}
                    />
                    <FormField
                        disabled={isLoading}
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>الوصف</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="ادخل وصف" className="h-32 resize-none" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="space-y-4">
                    <SelectLevel controler={form.control} />
                    <FormField
                        disabled={isLoading}
                        control={form.control}
                        name="rangeDate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>المدة الزمنية للفصل</FormLabel>
                                <RangeDate field={field} />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        disabled={isLoading}
                        control={form.control}
                        name="finalExamDate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>موعد الامتحان النهائي</FormLabel>
                                <FinalExamDate field={field} />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {term && (
                        <FormField
                            control={form.control}
                            disabled={isLoading}
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>حالة الفصل</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="اختر حالة الفصل الدراسية" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem className="text-green-500" value="Open">
                                                متاح
                                            </SelectItem>
                                            <SelectItem className="text-red-500" value="Close">
                                                مغلق
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )}
                </div>
                <div className="w-full lg:col-span-2 flex flex-col md:flex-row gap-2">
                    <Button type="submit" className="flex-grow" disabled={isLoading}>
                        {isLoading || (isUpdateLoading && <Loader2 className="me-2 h-4 w-4 animate-spin" />)}
                        {term ? "حفظ التعديلات" : "اضافة فصل"}
                    </Button>
                    {!term && (
                        <Button
                            type="reset"
                            variant="outline"
                            className="flex-shrink-0 md:w-48"
                            onClick={() => form.reset()}
                        >
                            تفريغ
                        </Button>
                    )}
                </div>
            </form>
        </Form>
    );
};

export default React.memo(TermForm);
