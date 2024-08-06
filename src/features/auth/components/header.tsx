"use client";
import Link from "next/link";
import React from "react";

type Props = { intro: string };

const AuthHeader = ({ intro }: Props) => {
    return (
        <article className="text-center">
            <Link href="/" className="text-2xl font-bold">
                منصة درس
            </Link>
            <p className="text-gray-600 mb-4 mt-2 text-sm">{intro}</p>
        </article>
    );
};

export default AuthHeader;
