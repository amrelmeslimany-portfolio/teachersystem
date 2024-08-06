"use client";

import React from "react";
import Link from "next/link";
import Lottie from "lottie-react";
import notfoundLottie from "../../../public/imgs/lottie/error-404.json";
import { cn } from "@/lib/utils";

type RootProps = { imgClassName?: string; title?: string; href?: string; backText?: string };

const Info: React.FC<RootProps> = ({ imgClassName, backText, href, title }) => {
    return (
        <div className="flex w-full items-center flex-col space-y-2 text-center">
            <Lottie animationData={notfoundLottie} className={cn([imgClassName || "w-28 h-w-28"])} />
            <article>
                <h6 className="font-bold text-xl mb-1">{title || "غير موجودة"}</h6>
                <Link href={href || "/"} className="text-primary">
                    الرجوع الي {backText || "الصفحة الرئيسية "}
                </Link>
            </article>
        </div>
    );
};

export default Info;
