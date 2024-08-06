import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

type Props = {
    icon: ReactNode;
    wrapperClassName: string;
};

const IconAvatar: React.FC<Props> = ({ icon, wrapperClassName }) => {
    return <div className={cn(["grid place-content-center rounded-[50%]", wrapperClassName])}>{icon}</div>;
};

export default IconAvatar;
