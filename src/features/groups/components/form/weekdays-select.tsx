import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Lottie from "lottie-react";
import React from "react";
import { Control } from "react-hook-form";
import LoadingLottie from "@/public/imgs/lottie/loader.json";
import Error from "@/components/ui/error";
import { CircleAlert } from "lucide-react";
import { useAllWeekdaysQuery } from "@/features/weekdays/weekdays-api";
import { WEEKDAYS_TRANSLATION } from "@/lib/constants";

type Props = { controler: Control<any> };

const SelectWeekdays: React.FC<Props> = ({ controler }) => {
    const { data: weekdays, isFetching, error } = useAllWeekdaysQuery();

    if (isFetching) return <Lottie animationData={LoadingLottie} className="w-14 h-14 mx-auto my-4" />;

    if (error) {
        console.log(error);

        return <Error error="لم يتم تحميل الجداول" />;
    }

    if (weekdays?.data.length == 0) return <FormDescription> قم باضافة جداول لانه غير متوفر </FormDescription>;

    return (
        <FormField
            control={controler}
            name="weekdaysId"
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
                            {weekdays?.data.map((weekdays: any) => (
                                <SelectItem key={weekdays.id} value={weekdays.id}>
                                    {Object.entries(WEEKDAYS_TRANSLATION)
                                    .map(([key, value]) => weekdays[key] && value + " , ")}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default SelectWeekdays;
