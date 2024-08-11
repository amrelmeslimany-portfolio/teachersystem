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
import { IGetGroupOnly } from "@/interfaces/groups";
import { GroupSchema } from "@/schema/group";
import InputController from "@/components/ui/input-controller";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import UploadImage from "@/components/shared/upload-image";
import { useAddGroupsMutation, useUpdateGroupsMutation } from "../../groups-api";
import { format, getTime } from "date-fns";
import SelectLevel from "@/features/term/components/term-form/select-level";
import SelectWeekdays from "./weekdays-select";
import { padZero } from "@/lib/utils";

export type GroupSchemaType = z.infer<typeof GroupSchema>;

type Props = { group?: IGetGroupOnly };

const GroupForm = ({ group }: Props) => {
    const [requestAdd, { isLoading }] = useAddGroupsMutation();
    const [requestUpdate, { isLoading: isUpdateLoading }] = useUpdateGroupsMutation();

    const router = useRouter();
    const { toast } = useToast();

    const form = useForm<GroupSchemaType>({
        resolver: zodResolver(GroupSchema),
        defaultValues: {
            title: group?.title || "",
            description: group?.description || "",
            cover: null,
            levelId: group?.level.id || "",
            weekdaysId: group?.weekdays.id || "",
            duration: {
                hour: group?.duration ? group.duration.split(":")[0] : "0",
                minute: group?.duration ? group.duration.split(":")[1] : "0",
            },
            appointTime: group?.appointTime ? format(group?.appointTime, "HH:mm") : "",
        },
    });

    const onSubmit = async ({ duration, ...values }: GroupSchemaType) => {
        const formdata = new FormData();
        Object.entries(values).forEach(([key, value]) => {
            if (!value) return;
            if (key === "cover" && value) formdata.append(key, value[0]);
            else formdata.append(key, value);
        });

        if (duration && duration.hour != "0" && duration.minute != "0") {
            formdata.append("duration", `${padZero(+duration?.hour)}:${padZero(+duration?.minute)}`);
        }

        try {
            if (group) await requestUpdate({ id: group.id, body: formdata }).unwrap();
            else await requestAdd(formdata).unwrap();

            toast({ title: `تم الحفظ بنجاح`, className: "bg-green-700 text-white py-4" });
            router.push(Routes.teacher.groups.home);
        } catch (error: any) {
            errorHandling(error, toast, form);
        }
    };

    return (
        <Form {...form}>
            <form
                encType="multipart/form-data"
                onSubmit={form.handleSubmit(onSubmit)}
                className=" grid grid-cols-1 lg:grid-cols-2 gap-5"
            >
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
                    <SelectLevel controler={form.control} />
                    <SelectWeekdays controler={form.control} />
                </div>
                <div className="space-y-4">
                    <FormField
                        disabled={isLoading}
                        control={form.control}
                        name="appointTime"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>الموعد</FormLabel>
                                <FormControl dir="rtl">
                                    <Input dir="rtl" lang="ar" type="time" className="justify-end" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormItem>
                        <FormLabel>المده</FormLabel>
                        <div className="flex items-center gap-2">
                            <FormField
                                disabled={isLoading}
                                control={form.control}
                                name="duration.hour"
                                render={({ field }) => (
                                    <>
                                        <FormItem className="border rounded-md flex gap-2 items-center py-2.5 px-3 flex-1">
                                            <Input
                                                className="focus-visible:ring-transparent rounded-none border-none p-0 h-auto"
                                                type="number"
                                                min={0}
                                                placeholder="00"
                                                {...field}
                                            />
                                            <span className="!m-0 text-xs text-gray-400">ساعة</span>
                                        </FormItem>
                                        <FormMessage />
                                    </>
                                )}
                            />
                            <FormField
                                disabled={isLoading}
                                control={form.control}
                                name="duration.minute"
                                render={({ field }) => (
                                    <>
                                        <FormItem className="border rounded-md flex gap-2 items-center py-2.5 px-3 flex-1">
                                            <Input
                                                className="focus-visible:ring-transparent rounded-none border-none p-0 h-auto"
                                                type="number"
                                                placeholder="00"
                                                max={99}
                                                min={0}
                                                {...field}
                                            />
                                            <span className="!m-0 text-xs text-gray-400">دقيقة</span>
                                        </FormItem>
                                        <FormMessage />
                                    </>
                                )}
                            />
                        </div>
                    </FormItem>

                    <UploadImage
                        controller={form.control}
                        isLoading={isLoading}
                        label="الغلاف"
                        name="cover"
                        reviewURL={group?.cover && group.cover !== "null" ? group.cover : null}
                    />
                </div>

                <div className="w-full lg:col-span-2 flex flex-col md:flex-row gap-2">
                    <Button type="submit" className="flex-grow" disabled={isLoading}>
                        {(isLoading || isUpdateLoading) && <Loader2 className="me-2 h-4 w-4 animate-spin" />}
                        {group ? "حفظ التعديلات" : "اضافة مجموعة"}
                    </Button>
                    {!group && (
                        <Button
                            type="reset"
                            variant="outline"
                            className="flex-shrink-0 md:w-48"
                            onClick={() => form.reset({ cover: null })}
                        >
                            تفريغ
                        </Button>
                    )}
                </div>
            </form>
        </Form>
    );
};

export default React.memo(GroupForm);
