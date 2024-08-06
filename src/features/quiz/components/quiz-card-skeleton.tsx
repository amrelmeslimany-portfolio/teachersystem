import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const QuizCardSkeleton = () => {
    return (
        <div className="flex flex-col space-y-3 border">
            <Skeleton className="w-full h-28  rounded-xl" />
            <div className="space-y-2">
                <Skeleton className="h-8 w-full" />
                <div className="flex justify-between">
                    <Skeleton className="h-4 w-10" />
                    <Skeleton className="h-4 w-10" />
                </div>
            </div>
            <Skeleton className="h-8 w-full mt-8" />
        </div>
    );
};

export default QuizCardSkeleton;
