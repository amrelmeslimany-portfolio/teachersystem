import React from "react";

type Props = {
    label: string;
    children: React.ReactNode;
    className?: string;
};

const SegmentTitle: React.FC<Props> = ({ children, label, className }) => {
    return (
        <div className={className}>
            <span className="text-xs text-gray-400 block mb-2">{label}</span>
            {children}
        </div>
    );
};

export default SegmentTitle;
