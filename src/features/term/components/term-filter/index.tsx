"use client";
import { updateQuery } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";
import FilterSwitch from "../../../../components/ui/filter-switch";

const TermFilter = () => {
    const pathname = usePathname();
    const { replace } = useRouter();
    const searchParams = useSearchParams();
    const [isAvilable, setIsAvilable] = React.useState(searchParams.get("status") === "Open");

    const onOpenedChange = useCallback(
        (checked: boolean) => {
            const q = updateQuery({ key: "status", value: "Open" }, checked, searchParams);
            setIsAvilable(checked);
            replace(`${pathname}?${q}`);
        },
        [replace, pathname, searchParams]
    );

    return (
        <div className="space-y-2">
            <FilterSwitch
                label={
                    <>
                        الفصول <span className="text-green-500">المتاحه</span>
                    </>
                }
                description="اظهار الفصول المتاحه فقط"
                onCheckedChange={onOpenedChange}
                checked={isAvilable}
            />
        </div>
    );
};

export default TermFilter;
