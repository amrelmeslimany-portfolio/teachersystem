import { IGetLevel, IGetLevelDetails } from "@/interfaces/level";
import { IOkResponse } from "@/interfaces/shared";
import { IGetTerm } from "@/interfaces/term";
import { queryURL } from "@/lib/utils";
import { emptySplitApi } from "@/redux/api-inject";

const levelsApi = emptySplitApi.injectEndpoints({
    endpoints: (build) => ({
        getLevels: build.query<IOkResponse<IGetLevel[]>, void>({
            query: (params) => ({
                url: `teacher/levels`,
                params,
            }),
            providesTags: ["Levels"],
        }),
        getDistinctLevels: build.query<any, void>({
            query: () => `teacher/levels/distinct-all`,
            providesTags: ["Levels"],
        }),
        getLevel: build.query<IOkResponse<IGetLevelDetails>, void>({
            query: (id) => `teacher/levels/${id}`,
            providesTags: ["Levels"],
        }),
        addLevel: build.mutation({
            query: (level) => ({
                url: `teacher/levels`,
                method: "POST",
                body: level,

                formData: true,
            }),

            invalidatesTags: ["Levels"],
        }),
        updateLevel: build.mutation({
            query: ({ id, level }: { id: string; level: any }) => ({
                url: `teacher/levels/${id}`,
                method: "PUT",
                body: level,
            }),
            invalidatesTags: ["Levels"],
        }),
        deleteLevel: build.mutation({
            query: (id: string) => ({
                url: `teacher/levels/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Levels"],
        }),
    }),

    overrideExisting: true,
});

export const {
    useGetLevelsQuery,
    useGetDistinctLevelsQuery,
    useGetLevelQuery,
    useUpdateLevelMutation,
    useDeleteLevelMutation,
    useAddLevelMutation,
} = levelsApi;
