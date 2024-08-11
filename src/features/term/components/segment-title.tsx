import Link from "next/link";
import React from "react";

type Props = {
    label: string;
    children: React.ReactNode;
    className?: string;
    href?: string;
};

const SegmentTitle: React.FC<Props> = ({ children, label, className, href }) => {
    return (
        <div className={className}>
            {!href && <span className="text-xs text-gray-400 block mb-2">{label}</span>}
            {href && (
                <div className="flex justify-between gap-2 flex-wrap mb-3">
                    <span className="text-xs text-gray-400 ">{label}</span>
                    <Link href={href} className="text-xs hover:border-b border-primary text-primary">
                        تفاصيل
                    </Link>
                </div>
            )}
            {children}
        </div>
    );
};

export default SegmentTitle;
