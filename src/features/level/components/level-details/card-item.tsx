import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { IGetCover } from "@/interfaces/shared";
import Image from "next/image";
import React from "react";
import DefaultImg from "@/public/imgs/default.png";
import Link from "next/link";
import { cn, imgSrc } from "@/lib/utils";
import { AppColors } from "@/lib/theme";
import { QuizStatus } from "@/interfaces/quizzes";

export type CardItemProps = IGetCover & { href: string; status?: string; isImage?: boolean; isUser?: boolean };

const CardItem = ({ cover, id, title, href, status, isImage = true, isUser = false }: CardItemProps) => {
    return (
        <Link href={href + `/${id}`} className={cn(["text-start group block", isUser ? "w-36" : "w-56"])}>
            <Card className="p-0.5 w-full  group bg-primary/5 border-none group-hover:shadow" dir="rtl">
                {isImage && (
                    <div
                        className={cn(["relative  rounded-lg bg-primary/5 overflow-hidden", isUser ? "h-32" : "h-36"])}
                    >
                        <Image
                            draggable={false}
                            src={imgSrc(cover, DefaultImg)}
                            alt="المرحله"
                            width={150}
                            height={150}
                            className="w-full h-full  absolute inset-0 object-cover group-hover:scale-110 transition duration-1000"
                            priority
                        />
                    </div>
                )}
                <CardHeader className="p-2" dir="rtl">
                    <CardTitle className="text-base  font-medium line-clamp-2">{title}</CardTitle>
                    {status && (
                        <CardDescription className={cn([AppColors.QuizStatus[status]])}>{status}</CardDescription>
                    )}
                </CardHeader>
            </Card>
        </Link>
    );
};

export default CardItem;
