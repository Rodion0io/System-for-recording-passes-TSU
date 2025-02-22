import { createSlice } from "@reduxjs/toolkit";

import { userSliceDatas } from "../../../@types/api";

const initialState: userSliceDatas = {
    token: null,
    logIn: false
};

const userSlice = createSlice({
    name: "userInfa",
    initialState,
    reducers: {
        logIn: (state, actions) => {
            state.logIn = true,
            state.token = actions.payload
        },
        logOut: (state) => {
            state.logIn = false,
            state.token = null
        }
    }
});

export const { logIn, logOut } = userSlice.actions;

export default userSlice.reducer;