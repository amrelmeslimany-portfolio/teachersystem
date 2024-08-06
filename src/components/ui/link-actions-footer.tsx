import React from "react";
import { CardFooter } from "./card";
import Link from "next/link";

type Props = {
    label: string;
    href: string;
    title: string;
    actions: React.ReactNode;
};

const LinkActionsFooter = ({ actions, href, label, title }: Props) => {
    return (
        <CardFooter className="p-4 border-t gap-2  justify-between">
            <div>
                <span className="text-gray-500 text-xs block">{label}</span>
                <Link className="text-primary font-bold hover:underline line-clamp-1" href={href}>
                    {title}
                </Link>
            </div>
            {actions}
        </CardFooter>
    );
};

export default LinkActionsFooter;
