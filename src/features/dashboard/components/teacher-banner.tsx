"use client";

import Banner from "@/components/ui/banner";
import React from "react";
import { useGetTeacherQuery } from "../dashboard-api";
import Curve from "../../../../public/imgs/SVG/curve";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BookUser, CalendarIcon, MapPin, School } from "lucide-react";
import InfoItem from "./info-item";
import Lottie from "lottie-react";
import LoaderLottie from "@/public/imgs/lottie/loader.json";
import Error from "@/components/ui/error";
import { Gender } from "@/lib/enums";

const TeacherBanner = () => {
    const { data, isFetching, error } = useGetTeacherQuery();

    if (isFetching) return <Lottie animationData={LoaderLottie} className="w-40 h-40 mx-auto" />;

    if (error) return <Error className="mb-4" error={error.toString()} />;

    const { data: teacher } = data!;
    return (
        <Banner className="mb-4 relative overflow-hidden p-10">
            <Curve className="absolute -top-56 -right-44 z-0 opacity-40" />
            <div className="z-10 relative flex gap-8 items-center ">
                <div className="text-center flex-shrink-0">
                    <Avatar className="w-36 h-36">
                        <AvatarImage src={teacher.picture || ""} className="bg-white" />
                        <AvatarFallback>المعلم</AvatarFallback>
                    </Avatar>
                    <h2 className="text-xl text-white font-bold mt-2">
                        {teacher.firstname} {teacher.lastname}
                    </h2>
                    <p className="text-gray-300">المعلم</p>
                </div>

                <ul className="flex gap-2 flex-col flex-1">
                    <InfoItem icon={School} label="المدرسة" value={teacher.school} />
                    <InfoItem icon={MapPin} label="العنوان" value={teacher.location} />
                    <InfoItem icon={BookUser} label="الجنس" value={teacher.gender} />
                    {teacher.age && <InfoItem icon={CalendarIcon} label="العمر" value={teacher.age.toString()} />}
                </ul>
            </div>
        </Banner>
    );
};

export default TeacherBanner;
