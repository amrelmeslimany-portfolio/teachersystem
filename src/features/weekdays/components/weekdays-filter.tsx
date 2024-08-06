"use client";
import { Button } from "@/components/ui/button";
import FilterSwitch from "@/components/ui/filter-switch";
import { WEEKDAYS_TRANSLATION } from "@/lib/constants";
import { updateQuery } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useMemo } from "react";

const WeekdaysFilter = () => {
    const pathname = usePathname();
    const { replace } = useRouter();
    const searchParams = useSearchParams();
    const [selected, setSelected] = React.useState<string[]>([]);

    const onOpenedChange = useCallback(
        (checked: boolean, key: string) => {
            // update selected state
            if (checked) setSelected((prev) => [...prev, key]);
            else setSelected((prev) => prev.filter((item) => item != key));

            // update url search
            const q = updateQuery({ key: key, value: true }, checked, searchParams);
            replace(`${pathname}?${q}`);
        },
        [replace, pathname, searchParams]
    );

    const onClearFilter = useCallback(() => {
        setSelected([]);
        replace(pathname);
    }, [replace, pathname]);

    useEffect(() => {
        searchParams.forEach((_, key) => setSelected((prev) => [...prev, key]));
    }, [searchParams]);

    return (
        <div className="gap-2 grid grid-cols-2">
            {Object.entries(WEEKDAYS_TRANSLATION).map(([key, value]) => (
                <FilterSwitch
                    key={key}
                    label={value}
                    onCheckedChange={(checked: boolean) => onOpenedChange(checked, key)}
                    checked={selected.includes(key)}
                />
            ))}
            <Button variant="secondary" onClick={onClearFilter} className="w-full col-span-2">
                الوضع الافتراضي
            </Button>
        </div>
    );
};

export default WeekdaysFilter;
