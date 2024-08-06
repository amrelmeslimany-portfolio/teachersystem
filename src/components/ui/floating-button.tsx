"use client";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = { href: string; label: string };

const FloatingButton = ({ href, label }: Props) => {
    return (
        <Link
            href={href}
            className="bg-primary p-2.5 z-10 shadow-lg shadow-black/15 backdrop-blur  hover:bg-primary/90 transition-all fixed bottom-5 right-1/2 rounded-full transform translate-x-1/2 flex items-center justify-center"
        >
            <Plus className="w-5 h-5 me-2  text-white " />
            <span className="text-white">{label}</span>
        </Link>
    );
};

export default FloatingButton;
