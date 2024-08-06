// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks

import { logoutAction, verifyEmailAction } from "@/features/auth/auth-slice";
import { ErrorsMessage } from "@/lib/enums";
import { BaseQueryFn, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// initialize an empty api service that we'll inject endpoints into later as needed
export const API_SERVER = "http://localhost:3005/api/";

const baseQuery = fetchBaseQuery({
    baseUrl: API_SERVER,
    credentials: "include",
    // headers: { "Content-type": "application/json; charset=UTF-8" },
});

const baseQueryWithReauth: BaseQueryFn = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    console.log("Error Base Query: API Inject File: ", result.error);

    if (result.error) {
        let errorResult = result.error;
        let errorMessage = (errorResult.data as any).message || null;
        // IF Response is access token expired , doing get refresh request
        if (errorResult.status == 403 && errorMessage == ErrorsMessage.JWT_EXPIRED) {
            const refreshReponse = await baseQuery("auth/refresh-token", api, extraOptions);
            // if repsonse is success, retrying the orignal request

            if ((refreshReponse?.data as any)?.isSuccess) {
                result = await baseQuery(args, api, extraOptions);
            }
        }

        if (errorResult.status === 401) {
            // IF not auth, logout
            if (errorMessage == ErrorsMessage.UNAUTHENTICATED) {
                api.dispatch(logoutAction());
            }

            // IF not verified email
            if (errorMessage == ErrorsMessage.EMIAL_NOT_VERIFIED) {
                api.dispatch(verifyEmailAction(false));
            }
        }
    }

    return result;
};

export const emptySplitApi = createApi({
    baseQuery: baseQueryWithReauth,

    endpoints: () => ({}),
    tagTypes: ["States", "Terms", "Levels", "Weekdays", "Groups"],
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
});
