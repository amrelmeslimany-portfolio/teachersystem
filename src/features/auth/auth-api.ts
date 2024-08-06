import { emptySplitApi } from "@/redux/api-inject";

const authApi = emptySplitApi.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation({
            query: (student) => ({
                url: "auth/student/login",
                method: "POST",
                body: student,
            }),
        }),
        teacherLogin: build.mutation({
            query: (teacher) => ({
                url: "auth/teacher/login",
                method: "POST",
                body: teacher,
            }),
        }),
        verifyEmail: build.query({ query: (id: string) => `auth/student/email-verification/${id}` }),
        checkVerifyEmail: build.query({ query: ({ token, id }) => `auth/student/verify-email/${token}/${id}` }),
        logout: build.query<any, void>({ query: () => "auth/logout" }),
    }),
    overrideExisting: true,
});

export const {
    useLoginMutation,
    useTeacherLoginMutation,
    useLazyLogoutQuery,
    useLazyVerifyEmailQuery,
    useLazyCheckVerifyEmailQuery,
} = authApi;
