"use client";
import React from "react";

export type StatesCardProps = {
    title: string;
    icon: any;
    value: number;
};

const StatesCard = ({ icon, title, value }: StatesCardProps) => {
    return (
        <div className="border border-gray-100 shadow-sm dark:border-gray-500 rounded-lg p-4">
            <div className="flex justify-between text-gray-600 gap-2 mb-2 items-center">
                <p className="text-sm">{title}</p>
                {React.createElement(icon, { className: "w-4 h-4" })}
            </div>
            <span className="text-4xl font-bold">{value}</span>
        </div>
    );
};

export default StatesCard;
