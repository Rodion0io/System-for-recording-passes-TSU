import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./slices/userSlice";
import requestsSlice from "./slices/requestsSlice";

export const store = configureStore({
    reducer: {
        userr: userSlice,
        reqests: requestsSlice
    }
});

export type RootType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;