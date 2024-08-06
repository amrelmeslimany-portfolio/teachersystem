import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

type Props = {
    label: string;
    value: string;
    Icon?: any;
    wrapperClassname?: string;
    valueClassname?: string;
    href?: string;
};

const ListItemIcon: React.FC<Props> = ({ label, value, Icon, href, valueClassname, wrapperClassname }) => {
    const classes = cn(["p-2 rounded-lg border flex justify-between items-center gap-2", wrapperClassname]);

    const content = (
        <>
            <div>
                <span className="text-xs text-gray-400 block">{label}</span>
                <p className={cn(["text-lg", href && "text-primary", valueClassname])}>{value}</p>
            </div>
            {Icon && <Icon className="p-1 flex-shrink-0 text-gray-400 w-7 h-7" />}
        </>
    );

    if (href) {
        return (
            <Link href={href} className={classes}>
                {content}
            </Link>
        );
    }

    return <div className={classes}>{content}</div>;
};

export default ListItemIcon;
