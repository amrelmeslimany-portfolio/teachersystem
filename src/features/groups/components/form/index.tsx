"use client";

import React from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

// Import React FilePond
import { Routes } from "@/lib/routes";
import { errorHandling } from "@/lib/error";
import { WeekdaysSchema } from "@/schema/weekdays";
import { IGetWeekdays } from "@/interfaces/weekdays";
import { useAddWeekdaysMutation, useUpdateWeekdaysMutation } from "../../weekdays-api";
import { WEEKDAYS_TRANSLATION } from "@/lib/constants";
import { Checkbox } from "@/components/ui/checkbox";

export type WeekdaysSchemaType = z.infer<typeof WeekdaysSchema>;

type Props = { weekdays?: IGetWeekdays };

const WeekdaysForm = ({ weekdays }: Props) => {
    const [requestAdd, { isLoading }] = useAddWeekdaysMutation();
    const [requestUpdate, { isLoading: isUpdateLoading }] = useUpdateWeekdaysMutation();

    const router = useRouter();
    const { toast } = useToast();

    const form = useForm<WeekdaysSchemaType>({
        resolver: zodResolver(WeekdaysSchema),
        defaultValues: {
            FR: weekdays?.FR || undefined,
            MO: weekdays?.MO || undefined,
            SA: weekdays?.SA || undefined,
            SU: weekdays?.SU || undefined,
            TH: weekdays?.TH || undefined,
            TU: weekdays?.TU || undefined,
            WE: weekdays?.WE || undefined,
        },
    });

    const onSubmit = async (values: WeekdaysSchemaType) => {
        try {
            if (weekdays) await requestUpdate({ id: weekdays.id, weekdays: values }).unwrap();
            else await requestAdd(values).unwrap();

            toast({ title: `تم الحفظ بنجاح`, className: "bg-green-700 text-white py-4" });
            router.push(Routes.teacher.weekdays.home);
        } catch (error: any) {
            errorHandling(error, toast, form);
        }
    };

    return (
        <Form {...form}>
            <form encType="multipart/form-data" onSubmit={form.handleSubmit(onSubmit)} className="flex flex-wrap gap-4">
                {Object.entries(WEEKDAYS_TRANSLATION).map(([key, value]) => {
                    return (
                        <FormField
                            key={key}
                            control={form.control}
                            name={key as any}
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <div className="mb-4 flex items-center">
                                        <FormControl className="me-2 ">
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormLabel className="font-normal align-top">{value}</FormLabel>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    );
                })}

                <div className="w-full  flex flex-col md:flex-row gap-2">
                    <Button type="submit" className="flex-grow" disabled={isLoading}>
                        {(isLoading || isUpdateLoading) && <Loader2 className="me-2 h-4 w-4 animate-spin" />}
                        {weekdays ? "حفظ التعديلات" : "اضافة جدول"}
                    </Button>
                    {!weekdays && (
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

export default React.memo(WeekdaysForm);
