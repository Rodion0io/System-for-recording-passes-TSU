import { createSlice } from "@reduxjs/toolkit";

import { requestSliceData } from "../../../@types/api";

const initialState: requestSliceData = {
    requestId: "",
}

const requestSlice = createSlice({
    name:"requestSlice",
    initialState,
    reducers:{
        newRequestId: (state, actions) => {
            state.requestId = actions.payload
        },
        delRequestId: (state) => {
            state.requestId = ""
        }
    }
});

export const { newRequestId, delRequestId } = requestSlice.actions

export default requestSlice.reducer