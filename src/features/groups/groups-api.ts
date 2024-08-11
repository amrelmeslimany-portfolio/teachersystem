import { IGetGroup, IGroupDetails } from "@/interfaces/groups";
import { IOkResponse } from "@/interfaces/shared";
import { emptySplitApi } from "@/redux/api-inject";

const groupsApi = emptySplitApi.injectEndpoints({
    endpoints: (build) => ({
        allGroups: build.query<IOkResponse<IGetGroup[]>, void>({
            query: (params) => ({
                url: `teacher/groups`,
                params,
            }),
            providesTags: ["Groups"],
        }),

        oneGroup: build.query<IOkResponse<IGroupDetails>, void>({
            query: (id) => `teacher/groups/${id}`,
            providesTags: ["Groups"],
        }),
        addGroups: build.mutation({
            query: (body) => ({
                url: `teacher/groups`,
                method: "POST",
                body,
                formData: true,
            }),

            invalidatesTags: ["Groups"],
        }),
        updateGroups: build.mutation({
            query: ({ id, body }: { id: string; body: any }) => ({
                url: `teacher/groups/${id}`,
                method: "PUT",
                body,
            }),
            invalidatesTags: ["Groups"],
        }),
        deleteGroups: build.mutation({
            query: (id: string) => ({
                url: `teacher/groups/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Groups"],
        }),
    }),

    overrideExisting: true,
});

export const {
    useAddGroupsMutation,
    useAllGroupsQuery,
    useOneGroupQuery,
    useDeleteGroupsMutation,
    useUpdateGroupsMutation,
} = groupsApi;
