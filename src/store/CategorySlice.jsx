import { createSlice } from "@reduxjs/toolkit";

const initState = {
    category: [],
    isLoading: false,
}

const slice = createSlice({
    name: "category",
    initialState: initState,
    reducers: {
        SET_LOADING: (state, action) => {
            state.isLoading = action.payload;
        },

        CREATE_CATEGORY: (state, action) => {
            const array = action.payload;
            state.category = state.category.concat(array);
        },
        HANDLE_DELETE: (state, action) => {
            state.category = state.category.filter(i => i._id != action.payload)
        },
        GET_CATEGORY: (state, action) => {
            state.category = action.payload
        },
        UPDATE_CATEGORY: (state, action) => {
            const id = action.payload.id
            const { form } = action.payload

            if (form) {
                const name = form.get('name')

                const updateState = state.category.map(item =>
                    item._id === id ? { ...item, name } : item)

                state.category = updateState
            }
        }
    }
})

const { reducer, actions } = slice

export const { SET_LOADING, CREATE_CATEGORY, HANDLE_DELETE, GET_CATEGORY, UPDATE_CATEGORY } = actions
export default reducer;