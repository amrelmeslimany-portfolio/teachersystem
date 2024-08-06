import { cn } from "@/lib/utils";
import React from "react";

const Banner = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    return <div className={cn(["p-4 gradient rounded-xl", className])}>{children}</div>;
};

export default Banner;
