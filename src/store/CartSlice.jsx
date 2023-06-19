import { createSlice } from "@reduxjs/toolkit";

const initState = {
    items: [],
    isLoading: false,
}

const slice = createSlice({
    name: 'cart',
    initialState: initState,
    reducers: {
        SET_LOADING: (state, actions) => {
            state.isLoading = actions.payload
        },
        GET_CARTITEMS: (state, action) => {
            state.items = action.payload
        },

        HANDLE_ADD_ITEM: (state, action) => {
            const item = action.payload

            state.items = state.items.push(item)
        },

        HANDLE_UPDATECART: (state, action) => {
            const id = action.payload.id
            const quantity = action.payload.quantity

            state.items = state.items.map((item) =>
                item._id === id ? { ...item, quantity: quantity } : item
            )
        },

        HANDLE_DELETEITEM: (state, action) => {
            state.items = state.items.filter(i => i._id != action.payload)
        }
    }
})

const { reducer, actions } = slice

export const { GET_CARTITEMS, HANDLE_ADD_ITEM, HANDLE_DELETEITEM, HANDLE_UPDATECART, SET_LOADING } = actions
export default reducer