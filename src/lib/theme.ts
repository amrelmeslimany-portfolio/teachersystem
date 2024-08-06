import { QuizStatus } from "@/interfaces/quizzes";

export class AppColors {
    static status: Record<string, string> = {
        Close: "text-red-500",
        Open: "text-green-500",
    };
    static QuizStatus: Record<string, string> = {
        Pending: "text-red-500",
        InProgress: "text-orange-500",
        Finished: "text-green-500",
    };
}
