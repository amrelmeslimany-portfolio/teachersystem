"use client";

import React, { Fragment } from "react";
import { useGetStatesQuery } from "../dashboard-api";
import Lottie from "lottie-react";
import LoaderLottie from "@/public/imgs/lottie/loader.json";
import {
    BookMarked,
    BookmarkX,
    Check,
    Eye,
    ListChecks,
    Notebook,
    Presentation,
    SquarePercent,
    ThumbsUp,
} from "lucide-react";
import StatesCard, { StatesCardProps } from "./states-card";

import QuizCard from "@/features/quiz/components/quiz-card";

const StatesSection = () => {
    const { data, isFetching, error } = useGetStatesQuery();

    if (isFetching) return <Lottie animationData={LoaderLottie} className="w-14 h-14" />;

    if (error) return <h1>{JSON.stringify(error)}</h1>;

    const states: StatesCardProps[] = [
        {
            title: "الوحدات",
            icon: BookMarked,
            value: data?.data.units || 0,
        },
        {
            title: "الدروس",
            icon: Presentation,
            value: data?.data.lessons || 0,
        },
        {
            title: "دروس شاهدتها",
            icon: Eye,
            value: data?.data.lessonsView || 0,
        },
        {
            title: "دروس اعجبتك",
            icon: ThumbsUp,
            value: data?.data.lessonLikes || 0,
        },
        {
            title: "الاختبارات",
            icon: ListChecks,
            value: data?.data.quizes || 0,
        },
        {
            title: "اختبارات اجتزتها",
            icon: Check,
            value: data?.data.takenQuizes || 0,
        },
        {
            title: "اختبارات فقدتها",
            icon: BookmarkX,
            value: data?.data.leftQuizes || 0,
        },
        {
            title: "متوسط درجاتك",
            icon: SquarePercent,
            value: data?.data.quizAVGMarks || 0,
        },
        {
            title: "ملاحظات المعلم",
            icon: Notebook,
            value: data?.data.notes || 0,
        },
        {
            title: "ملاحظات شاهدتها",
            icon: Eye,
            value: data?.data.notesView || 0,
        },
    ];

    return (
        <Fragment>
            {data?.data && data.data.nextQuiz.length > 0 && (
                <section className="mb-8">
                    <h3 className="text-2xl font-medium mb-2">اختبارات</h3>
                    <p className="text-sm text-gray-600 mb-4">يجب ان تأخذ هذة الاختبارات حتي لا تخسر درجاتها</p>
                    <div className="grid grid-cols-4">
                        {data?.data.nextQuiz.map((quiz) => (
                            <QuizCard key={quiz.id} quiz={quiz} />
                        ))}
                    </div>
                </section>
            )}
            <section>
                <h3 className="text-2xl font-medium mb-4">احصائيات</h3>
                <div className="grid grid-cols-5 gap-4">
                    {states.map((item) => (
                        <StatesCard key={item.title} {...item} />
                    ))}
                </div>
            </section>
        </Fragment>
    );
};

export default StatesSection;
