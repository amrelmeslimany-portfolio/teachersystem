import { IOkResponse } from "@/interfaces/shared";
import { IGetWeekdays, IWeekdaysDetails } from "@/interfaces/weekdays";
import { emptySplitApi } from "@/redux/api-inject";

const weekdaysApi = emptySplitApi.injectEndpoints({
    endpoints: (build) => ({
        allWeekdays: build.query<IOkResponse<IGetWeekdays[]>, void>({
            query: (params) => ({
                url: `teacher/weekdays`,
                params,
            }),
            providesTags: ["Weekdays"],
        }),

        oneWeekdays: build.query<IOkResponse<IWeekdaysDetails>, void>({
            query: (id) => `teacher/weekdays/${id}`,
            providesTags: ["Weekdays"],
        }),
        addWeekdays: build.mutation({
            query: (weekdays) => ({
                url: `teacher/weekdays`,
                method: "POST",
                body: weekdays,

                formData: true,
            }),

            invalidatesTags: ["Weekdays"],
        }),
        updateWeekdays: build.mutation({
            query: ({ id, weekdays }: { id: string; weekdays: any }) => ({
                url: `teacher/weekdays/${id}`,
                method: "PUT",
                body: weekdays,
            }),
            invalidatesTags: ["Weekdays"],
        }),
        deleteWeekdays: build.mutation({
            query: (id: string) => ({
                url: `teacher/weekdays/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Weekdays"],
        }),
    }),

    overrideExisting: true,
});

export const {
    useAddWeekdaysMutation,
    useAllWeekdaysQuery,
    useDeleteWeekdaysMutation,
    useOneWeekdaysQuery,
    useUpdateWeekdaysMutation,
} = weekdaysApi;
