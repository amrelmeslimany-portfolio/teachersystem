import React from "react";
import { FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { FilePond, registerPlugin } from "react-filepond";
import { ALLOWED_IMAGES } from "@/lib/constants";
import Image from "next/image";

// Import React FilePond
import ReviewPlugin from "filepond-plugin-image-preview";
import ImagTypePlugin from "filepond-plugin-file-validate-type";
// Import FilePond styles
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
import "filepond/dist/filepond.css";

type Props = {
    label: string;
    isLoading: boolean;
    controller: any;
    name: any;
    reviewURL?: string | null;
};

registerPlugin(ReviewPlugin, ImagTypePlugin);

const UploadImage = ({ controller, isLoading, label, name, reviewURL }: Props) => {
    return (
        <FormField
            disabled={isLoading}
            control={controller}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FilePond
                        credits={false}
                        maxFiles={1}
                        acceptedFileTypes={ALLOWED_IMAGES}
                        allowMultiple={false}
                        onupdatefiles={(files) => field.onChange(files.map((item) => item.file))}
                        labelIdle="قم باختيار او سحب صورة غلاف"
                        name={name}
                    />
                    <FormMessage />
                    {reviewURL && <Image src={reviewURL} alt={label} width={100} height={100} />}
                </FormItem>
            )}
        />
    );
};

export default UploadImage;
