"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn, updateQuery } from "@/lib/utils";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";

const LevelFilter = () => {
    const pathname = usePathname();
    const { replace } = useRouter();
    const searchParams = useSearchParams();
    const [input, setInput] = React.useState(searchParams.get("title") || "");

    const onSearchClick = useCallback(() => {
        const isEmpty = input.trim().length == 0;
        const q = updateQuery({ key: "title", value: input.trim() }, !isEmpty, searchParams);
        replace(`${pathname}?${q}`);
    }, [replace, pathname, searchParams, input]);

    const onClearFilter = useCallback(() => {
        setInput("");
        replace(pathname);
    }, [replace, pathname]);

    return (
        <div className="space-y-2">
            <div className="flex rounded-xl  w-full sm items-center space-x-2 border py-1 px-1.5">
                <Input
                    type="search"
                    className="focus-visible:ring-transparent border-none border-e "
                    placeholder="بحث عن مرحله"
                    onChange={(value) => setInput(value.target.value)}
                    value={input}
                />
                <Button onClick={onSearchClick} size="sm" className="!me-0 rounded-xl">
                    <Search className="w-4 h-4" />
                </Button>
            </div>
            <Button variant={"secondary"} onClick={onClearFilter} className="w-full">
                الوضع الافتراضي
            </Button>
        </div>
    );
};

export default LevelFilter;
