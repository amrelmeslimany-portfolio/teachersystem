import React from "react";

type Props = {
    value: number;
    label: string;
};

const LevelCounter = ({ label, value }: Props) => {
    return (
        <li className="text-center">
            <span className="text-xl text-white font-semibold">{value}</span>
            <p className="text-sm text-gray-300">{label}</p>
        </li>
    );
};

export default LevelCounter;
