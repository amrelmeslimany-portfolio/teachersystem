"use client";

import React from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import InputController from "@/components/ui/input-controller";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { LevelSchema } from "@/schema/level";
import { LevelOnlyType } from "@/interfaces/level";
import { useAddLevelMutation, useUpdateLevelMutation } from "../../level-api";
import { Routes } from "@/lib/routes";
import { errorHandling } from "@/lib/error";
import UploadImage from "@/components/shared/upload-image";

export type LevelSchemaType = z.infer<typeof LevelSchema>;

type Props = { level?: LevelOnlyType };

const LevelForm = ({ level }: Props) => {
    const [requestAdd, { isLoading }] = useAddLevelMutation();
    const [requestUpdate, { isLoading: isUpdateLoading }] = useUpdateLevelMutation();

    const router = useRouter();
    const { toast } = useToast();

    const form = useForm<LevelSchemaType>({
        resolver: zodResolver(LevelSchema),
        defaultValues: {
            title: level?.title || "",
            description: level?.description || "",
            cover: null,
        },
    });

    const onSubmit = async (values: LevelSchemaType) => {
        const formdata = new FormData();
        formdata.append("title", values.title);
        formdata.append("description", values.description);
        values.cover && formdata.append("cover", values.cover[0]);

        try {
            if (level) await requestUpdate({ id: level.id, level: formdata }).unwrap();
            else await requestAdd(formdata).unwrap();
            toast({ title: `تم الحفظ بنجاح`, className: "bg-green-700 text-white py-4" });
            router.push(Routes.teacher.levels.home);
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
                </div>
                <div className="space-y-4">
                    <UploadImage
                        controller={form.control}
                        isLoading={isLoading}
                        label="الغلاف"
                        name="cover"
                        reviewURL={level?.cover}
                    />
                </div>

                <div className="w-full lg:col-span-2 flex flex-col md:flex-row gap-2">
                    <Button type="submit" className="flex-grow" disabled={isLoading}>
                        {(isLoading || isUpdateLoading) && <Loader2 className="me-2 h-4 w-4 animate-spin" />}
                        {level ? "حفظ التعديلات" : "اضافة مرحلة"}
                    </Button>
                    {!level && (
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

export default React.memo(LevelForm);
