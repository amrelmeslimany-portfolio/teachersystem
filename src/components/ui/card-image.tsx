import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { ReactNode } from "react";
import DefaultImg from "@/public/imgs/default.png";

type Props = {
    src: string | null;
    className?: string;
    content?: ReactNode;
};

const CardImage = ({ src, className, content }: Props) => {
    return (
        <div className={cn(["relative  rounded-lg bg-primary/5 overflow-hidden", className])}>
            <Image
                src={src || DefaultImg}
                alt="المرحله"
                width={500}
                height={500}
                className="w-full h-full  absolute inset-0 object-cover"
                priority
            />
            {content && (
                <div className="absolute inset-0 w-full p-4 h-full  bg-gradient-to-t to-primary/60   from-primary/90 grid translate-y-full group-hover:translate-y-0 transition-transform">
                    {content}
                </div>
            )}
        </div>
    );
};

export default CardImage;
