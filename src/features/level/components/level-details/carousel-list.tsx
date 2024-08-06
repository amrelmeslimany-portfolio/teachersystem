"use client";
import * as React from "react";
import CardItem, { CardItemProps } from "./card-item";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "@/styles/carousel.css";
import Lottie from "lottie-react";
import EmptyImg from "@/public/imgs/lottie/empty-img.json";

type Props = {
    label: string;
    className?: string;
    list: CardItemProps[];
    href: string;
};

export function CarouselList({ label, className, list, href }: Props) {
    return (
        <div className={className} dir="rtl">
            <div className="flex justify-between gap-4 items-center ">
                <span className="text-xs text-gray-400 block">{label}</span>
                {list.length > 0 && (
                    <Link className="text-sm text-primary hover:border-b border-primary transition" href={href}>
                        المزيد
                        <ArrowLeft className="w-3 h-3 ms-1 inline-block" />
                    </Link>
                )}
            </div>

            {list.length > 0 && (
                <Swiper
                    spaceBetween={10}
                    className="!py-2"
                    slidesPerView={"auto"}
                    dir="rtl"
                    navigation={true}
                    modules={[Navigation]}
                >
                    {list.map((item) => (
                        <SwiperSlide className="!w-fit" key={item.id}>
                            <CardItem {...item} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}

            {list.length == 0 && (
                <div className="text-center">
                    <Lottie animationData={EmptyImg} className="h-28 w-28 mx-auto" />
                    <p className="text-sm mt-2">
                        لا يوجد مجموعات,
                        <Link href={href} className="text-primary hover:underline">
                            الذهاب للمجموعات
                        </Link>
                    </p>
                </div>
            )}
        </div>
    );
}
