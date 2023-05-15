import { createSlice } from "@reduxjs/toolkit";

const initState = {
    isAuthenticated: false,
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
        SET_AUTHENTICATION: (state, action) => {
            state.isAuthenticated = action.payload
        }
    }
})

const { actions, reducer } = slice;
export const { LOADING, SET_ROLE, SET_USER, LOGOUT, SET_AUTHENTICATION } = actions
export default reducer;