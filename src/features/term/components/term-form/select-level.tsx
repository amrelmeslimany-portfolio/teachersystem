import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGetDistinctLevelsQuery } from "@/features/level/level-api";
import Lottie from "lottie-react";
import React from "react";
import { Control } from "react-hook-form";
import LoadingLottie from "@/public/imgs/lottie/loader.json";
import Error from "@/components/ui/error";
import Info from "@/components/ui/info";
import { CircleAlert } from "lucide-react";

type Props = { controler: Control<any> };

const SelectLevel: React.FC<Props> = ({ controler }) => {
    const { data: levels, isFetching, error } = useGetDistinctLevelsQuery();

    if (isFetching) return <Lottie animationData={LoadingLottie} className="w-14 h-14 mx-auto my-4" />;

    if (error) {
        console.log(error);

        return <Error error="لم يتم تحميل المراحل" />;
    }

    if (levels?.data.length == 0) return <FormDescription> قم باضافة مراحل لانه غير متوفر </FormDescription>;

    return (
        <FormField
            control={controler}
            name="levelId"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>المرحلة الدراسية</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="اختر المرحلة الدراسية" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {levels?.data.map((level: any) => (
                                <SelectItem key={level.id} value={level.id}>
                                    {level.title}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <FormDescription>
                        <CircleAlert className="w-3 h-3 me-1 inline-block" />
                        لكل مرحلة دراسيه موعد مختلف وكل سنه يتغير هذا الموعد
                    </FormDescription>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default SelectLevel;
