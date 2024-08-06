import { IStates } from "@/interfaces/student";
import { ITeacher } from "@/interfaces/teacher";
import { emptySplitApi } from "@/redux/api-inject";

const dashboardApi = emptySplitApi.injectEndpoints({
    endpoints: (build) => ({
        getStates: build.query<{ data: IStates }, void>({
            query: () => "student/states",
            providesTags: ["States"],
        }),
        getTeacher: build.query<{ data: ITeacher }, void>({
            query: () => "profile/teacher",
        }),
    }),
    overrideExisting: true,
});

export const { useGetStatesQuery, useGetTeacherQuery } = dashboardApi;
