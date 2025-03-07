import { createSlice } from "@reduxjs/toolkit";

import { userSliceDatas } from "../../../@types/api";

const initialState: userSliceDatas = {
    token: null,
};

const userSlice = createSlice({
    name: "userInfa",
    initialState,
    reducers: {
        logIn: (state, actions) => {
            state.token = actions.payload
        },
        logOut: (state) => {
            state.token = null
        }
    }
});

export const { logIn, logOut } = userSlice.actions;

export default userSlice.reducer;