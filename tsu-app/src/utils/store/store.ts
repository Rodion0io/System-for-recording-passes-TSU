import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./slices/userSlice";

export const store = configureStore({
    reducer: {
        userr: userSlice
    }
});

export type RootType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;