import React from "react";
import IconAvatar from "./icon-avatar";
import { cn } from "@/lib/utils";

const CarouselIcon = ({ isDisabled, Icon }: { Icon: any; isDisabled: boolean | undefined }) => {
    return (
        <IconAvatar
            icon={<Icon className={cn(["w-5 h-5 text-white"])} />}
            wrapperClassName={cn([
                "w-8 h-8 cursor-pointer border shadow-sm backdrop-blur",
                isDisabled ? "hidden" : "bg-primary/90",
            ])}
        />
    );
};

export default CarouselIcon;
