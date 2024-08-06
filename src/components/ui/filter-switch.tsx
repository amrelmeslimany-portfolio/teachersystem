"use client";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import React from "react";

type Props = {
    label: React.ReactNode | string;
    onCheckedChange: (checked: boolean) => void;
    checked: boolean;
    description?: string;
};

const FilterSwitch = ({ label, onCheckedChange, checked, description }: Props) => {
    return (
        <Label
            className="flex items-center justify-between gap-2 cursor-pointer p-2 border rounded-lg"
            id={label as string}
        >
            <div>
                <p className="text-base line-clamp-1">{label}</p>
                {description && <p className="text-xs text-gray-400">{description}</p>}
            </div>
            <Switch id={label as string} onCheckedChange={onCheckedChange} checked={checked} />
        </Label>
    );
};

export default React.memo(FilterSwitch);
