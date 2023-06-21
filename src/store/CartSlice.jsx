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

        HANDLE_UPDATECART: (state, action) => {
            const form = action.payload

            if (form) {
                const id = form.get("id")
                const quantity = form.get("quantity")

                state.items = state.items.map((item) =>
                    item._id === id ? { ...item, quantity: quantity } : item
                )
            }


        },

        HANDLE_DELETEITEM: (state, action) => {
            state.items = state.items.filter(i => i.toy_id._id != action.payload)
        }
    }
})

const { reducer, actions } = slice

export const { GET_CARTITEMS, HANDLE_DELETEITEM, HANDLE_UPDATECART, SET_LOADING } = actions
export default reducer