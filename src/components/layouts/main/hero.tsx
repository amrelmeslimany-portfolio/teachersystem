import React from "react";
import Curve from "../../../../public/imgs/SVG/curve";
import heroTeacherImg from "../../../../public/imgs/hero-teacher.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PlaySquare } from "lucide-react";

const Hero = () => {
    return (
        <div className="min-h-[30vh] relative gradient overflow-hidden">
            <Curve className="absolute -top-1/4 z-0 opacity-20" />
            <div className="relative z-10 pt-28 pb-16 container">
                <div className="grid grid-cols-2 gap-40 items-center">
                    <div>
                        <h5 className="text-lg text-gray-200 mb-6"> مرحبا بكم في</h5>
                        <h1 className="text-5xl text-white font-bold">
                            منصة
                            <span className="text-rose-500 inline-block mx-2 border-b-2 border-rose-500 pb-1.5 ">
                                درس
                            </span>
                            اونلاين
                        </h1>
                        <p className="text-gray-200 my-6">
                            منصة درس اونلاين هي منصة تعليمية مجانية تهدف إلى توفير محتوى تعليمي المعلم ويكون الدرس
                            اونلاين
                        </p>
                        <Button>
                            <PlaySquare className="ml-2 h-4 w-4" />
                            طريقة الاستخدام
                        </Button>
                    </div>

                    <div>
                        <Image src={heroTeacherImg} alt="درس" sizes="100%" priority />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
