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
import { ALLOWED_IMAGES, LevelSchema } from "@/schema/level";
import { LevelOnlyType } from "@/interfaces/level";
import Image from "next/image";

// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";
import ReviewPlugin from "filepond-plugin-image-preview";
import ImagTypePlugin from "filepond-plugin-file-validate-type";
// Import FilePond styles
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
import "filepond/dist/filepond.css";
import { useAddLevelMutation, useUpdateLevelMutation } from "../../level-api";
import { Routes } from "@/lib/routes";
import { errorHandling } from "@/lib/error";

registerPlugin(ReviewPlugin, ImagTypePlugin);

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
                    <FormField
                        disabled={isLoading}
                        control={form.control}
                        name="cover"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>الغلاف</FormLabel>
                                <FilePond
                                    credits={false}
                                    maxFiles={1}
                                    acceptedFileTypes={ALLOWED_IMAGES}
                                    allowMultiple={false}
                                    onupdatefiles={(files) => field.onChange(files.map((item) => item.file))}
                                    labelIdle="قم باختيار او سحب صورة غلاف"
                                    name="cover"
                                />
                                <FormMessage />
                                {level?.cover && <Image src={level.cover} alt={level.title} width={100} height={100} />}
                            </FormItem>
                        )}
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
