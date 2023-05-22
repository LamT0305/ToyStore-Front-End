import { createSlice } from "@reduxjs/toolkit";

const initState = {
    toys: [],
    toy: {},
    isLoading: false,
    totalPages: 0,
}

const slice = createSlice({
    name: 'toys',
    initialState: initState,
    reducers: {
        SET_LOADING: (state, action) => {
            state.isLoading = action.payload
        },
        GET_TOYS: (state, action) => {
            state.toys = action.payload
        },
        HANDLE_DELETE: (state, action) => {
            state.toys = state.toys.filter(index => index._id != action.payload)
        },
        GET_TOTALPAGES: (state, action) => {
            state.totalPages = action.payload;
        },
        GET_TOYID: (state, action) => {
            state.toy = action.payload
        }
    }
})

const { reducer, actions } = slice;
export const { SET_LOADING, GET_TOYS, HANDLE_DELETE, GET_TOTALPAGES, GET_TOYID } = actions
export default reducer