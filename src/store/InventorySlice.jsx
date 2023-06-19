import { createSlice } from "@reduxjs/toolkit";

const initState = {
    inventories: [],
}

const slice = createSlice({
    name: 'inventories',
    initialState: initState,
    reducers: {
        GET_INVENTORY: (state, action) => {
            state.inventories = action.payload
        },
        UPDATE_INVENTORY: (state, action) => {
            const id = action.payload.id
            const quantity = action.payload.quantity
            console.log(action.payload.quantity)
            if (quantity && id) {
                state.inventories = state.inventories.map(each =>
                    each._id == id ? { ...each, quantity_available: quantity } : each
                )
            }
        },


    }
})

const { reducer, actions } = slice
export const { GET_INVENTORY, UPDATE_INVENTORY } = actions
export default reducer