import { IOkResponse } from "@/interfaces/shared";
import { IGetTerm, IGetTermDetails, TermOnlyType } from "@/interfaces/term";
import { queryURL } from "@/lib/utils";
import { emptySplitApi } from "@/redux/api-inject";
import { TermSchemaType } from "./components/term-form/term-from";

export type StatusType = "Open" | "Close";

export type TermQueryType = Partial<{
    status: StatusType;
    sortBy: string;
    orderBy: "asc" | "desc";
    page: string;
    limit: string;
}>;

const termApi = emptySplitApi.injectEndpoints({
    endpoints: (build) => ({
        getTerms: build.query<IOkResponse<IGetTerm[]>, TermQueryType>({
            query: (query?: TermQueryType) => ({
                url: `teacher/terms`,
                params: query,
            }),

            providesTags: ["Terms"],
        }),
        getTerm: build.query<IOkResponse<IGetTermDetails>, void>({
            query: (id) => `teacher/terms/${id}`,
            providesTags: ["Terms"],
        }),
        addTerm: build.mutation({
            query: (term) => ({
                url: "teacher/terms",
                method: "POST",
                body: term,
            }),
            invalidatesTags: ["Terms"],
        }),
        deleteTerm: build.mutation({
            query: (id: string) => ({
                url: `teacher/terms/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Terms"],
        }),
        updateTerm: build.mutation({
            query: (data: { id: string; term: any }) => ({
                url: `teacher/terms/${data.id}`,
                method: "PUT",
                body: data.term,
            }),
            invalidatesTags: ["Terms"],
        }),
    }),

    overrideExisting: true,
});

export const {
    useGetTermsQuery,
    useAddTermMutation,
    useGetTermQuery,
    useUpdateTermMutation,
    useLazyGetTermQuery,
    useDeleteTermMutation,
} = termApi;
