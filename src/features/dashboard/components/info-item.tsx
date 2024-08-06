import React from "react";

type Props = {
    icon: any;
    label: string;
    value: string;
};

const InfoItem = ({ icon: Icon, label, value }: Props) => {
    return (
        <li className="bg-white/10 p-4 backdrop-blur flex-1 rounded-lg gap-4 items-center text-white flex">
            <div className="text-sm text-gray-300">
                <Icon className="mb-2 w-5 h-5 mx-auto" />
                <span>{label}</span>
            </div>
            <span className="h-12 block w-px bg-gray-400 " />
            <p className="text-lg">{value}</p>
        </li>
    );
};

export default InfoItem;
