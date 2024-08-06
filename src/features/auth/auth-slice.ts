import { toast } from "@/components/ui/use-toast";
import { IStudent } from "@/interfaces/student";
import { ITeacher } from "@/interfaces/teacher";
import { ErrorsMessage } from "@/lib/enums";
import { RootState } from "@/redux/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = ITeacher | IStudent | null;

export type LogoutTypes = "logout" | "unauthonticated";

interface AuthState {
    user: User;
}

const initialState: AuthState = {
    user: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginAction: (state, { payload }: PayloadAction<User>) => {
            state.user = payload;
        },
        verifyEmailAction: (state, { payload }: PayloadAction<boolean>) => {
            (state.user as IStudent).isEmailVerified = payload;
        },
        logoutAction: (state) => {
            state.user = null;
        },
    },
});

export const { loginAction, logoutAction, verifyEmailAction } = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;
