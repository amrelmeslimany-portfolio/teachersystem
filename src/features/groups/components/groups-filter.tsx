"use client";
import { Button } from "@/components/ui/button";
import FilterSwitch from "@/components/ui/filter-switch";
import { useGetDistinctLevelsQuery } from "@/features/level/level-api";
import { updateQuery } from "@/lib/utils";
import Lottie from "lottie-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect } from "react";
import LoadingLottie from "@/public/imgs/lottie/loader.json";
import { IGet } from "@/interfaces/shared";

const GroupsFilter = () => {
    const { data, isFetching, error } = useGetDistinctLevelsQuery();
    const pathname = usePathname();
    const { replace } = useRouter();
    const searchParams = useSearchParams();
    const [selected, setSelected] = React.useState<string[]>(
        searchParams.has("levelId") ? JSON.parse(searchParams.get("levelId")!).in : []
    );

    const onOpenedChange = useCallback(
        (checked: boolean, key: string) => {
            // update selected state
            if (checked) setSelected((prev) => [...prev, key]);
            else setSelected((prev) => prev.filter((item) => item != key));
        },
        [replace, pathname, searchParams, selected]
    );

    const onClearFilter = useCallback(() => {
        setSelected([]);
        replace(pathname);
    }, [replace, pathname]);

    useEffect(() => {
        const q = updateQuery(
            { key: "levelId", value: JSON.stringify({ in: selected }) },
            selected.length > 0,
            searchParams
        );
        replace(`${pathname}?${q}`);
    }, [selected, searchParams, pathname, replace]);

    return (
        <div className="space-y-2">
            {isFetching && <Lottie animationData={LoadingLottie} className="w-10 h-10 mx-auto my-4" />}
            {data?.data?.length > 0 &&
                data.data.map((item: IGet) => (
                    <FilterSwitch
                        key={item.id}
                        label={item.title}
                        onCheckedChange={(checked: boolean) => onOpenedChange(checked, item.id)}
                        checked={selected.includes(item.id)}
                    />
                ))}
            <Button variant="secondary" onClick={onClearFilter} className="w-full col-span-2">
                الوضع الافتراضي
            </Button>
        </div>
    );
};

export default GroupsFilter;
