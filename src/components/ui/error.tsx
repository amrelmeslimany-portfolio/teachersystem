"use client";

import React from "react";
import IconAvatar from "./icon-avatar";
import { XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
    className?: string;
    error: string;
};

const Error = ({ className, error }: Props) => {
    return (
        <div className={cn(["w-fit mx-auto text-center", className])}>
            <IconAvatar
                icon={<XCircle className="w-11 h-11 text-red-700" />}
                wrapperClassName="bg-red-100 w-20 h-20 mx-auto p-4"
            />
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{error}</p>
        </div>
    );
};

export default Error;
