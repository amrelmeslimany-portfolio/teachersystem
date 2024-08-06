import { queryURL } from "@/lib/utils";
import { emptySplitApi } from "@/redux/api-inject";

export enum QuizStatus {
    Pending,
    InProgress,
    Finished,
}

const quizApi = emptySplitApi.injectEndpoints({
    endpoints: (build) => ({
        getQuizzes: build.query({
            query: (status) => `student/quizes?${queryURL("status", status)}`,
        }),
    }),
    overrideExisting: true,
});

export const {} = quizApi;
