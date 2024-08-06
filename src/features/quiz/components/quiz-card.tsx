import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle, CardFooter } from "@/components/ui/card";

import { INextQuiz } from "@/interfaces/quizzes";
import { format } from "date-fns";
import { CalendarDays, Link } from "lucide-react";
import React from "react";
import QuizCardSkeleton from "./quiz-card-skeleton";

type ContentType = {
    icon: any;
    label: string;
    value: string;
};

type Props = { isLoading?: boolean; quiz: INextQuiz; content?: ContentType; action?: React.ReactNode };

const QuizCard = ({ quiz, action, content, isLoading }: Props) => {
    if (isLoading) return <QuizCardSkeleton />;
    return (
        <Card className="overflow-hidden shadow border-gray-100">
            {/* FIXME handle empty images */}
            {/* <EmptyImage alt={quiz.title} src={quiz.cover || ""} className="w-full h-28 bg-teal-50" /> */}
            <CardContent className="p-4">
                <CardTitle className="text-xl">{quiz.title}</CardTitle>
                <div className="flex justify-between text-gray-500 mt-2">
                    <p className="flex items-center">
                        {React.createElement(content?.icon || CalendarDays, { className: "w-4 h-4 me-1" })}
                        <span>{content?.label || "اخر موعد"}</span>
                    </p>
                    <b>{content?.value || format(quiz.endDate, "dd MMMM, yyyy")}</b>
                </div>
            </CardContent>
            <CardFooter className="p-0">
                {action || (
                    <Button className="w-full" size="sm">
                        {/* FIXME change */}
                        <Link href={`/quizzes/${quiz.id}`}>ابدأ الاختبار</Link>
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
};

export default QuizCard;
