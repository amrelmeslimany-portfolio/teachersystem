"use client";

import authSlice from "@/features/auth/auth-slice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { emptySplitApi } from "./api-inject";
import storage from "redux-persist/lib/storage";
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from "redux-persist";

const persistConfig = {
    key: "root-storage",
    storage,
    safelist: ["auth"],
    // BUG this deonst run the intercepter when jwt expired
    // blacklist: [emptySplitApi.reducerPath],
};

const reducers = combineReducers({ auth: authSlice, [emptySplitApi.reducerPath]: emptySplitApi.reducer });

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(emptySplitApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
