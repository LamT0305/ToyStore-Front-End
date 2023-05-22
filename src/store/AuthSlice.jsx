import { createSlice } from "@reduxjs/toolkit";

const initState = {
    user: {},
    isLoading: false,
    role: "user",
}

const slice = createSlice({
    name: "Auth",
    initialState: initState,
    reducers: {
        LOADING: (state, action) => {
            state.isLoading = action.payload;
        },
        SET_USER: (state, action) => {
            state.user = action.payload
        },
        SET_ROLE: (state, action) => {
            state.role = action.payload
        },
        LOGOUT: (state) => {
            state.isAuthenticated = false;
            state.user = {}
        },
        
    }
})

const { actions, reducer } = slice;
export const { LOADING, SET_ROLE, SET_USER, LOGOUT } = actions
export default reducer;