import { createSlice } from "@reduxjs/toolkit";

const initState = {
    store: [],
    isLoading: false,
    totalPages: 0,
}

const slice = createSlice({
    name: "store",
    initialState: initState,
    reducers: {
        SET_LOADING: (state, action) => {
            state.isLoading = action.payload;
        },

        CREATE_STORE: (state, action) => {
            const array = action.payload;
            state.store = state.store.concat(array);
        },
        HANDLE_DELETE: (state, action) => {
            state.store = state.store.filter(i => i._id != action.payload)
        },
        GET_STORE: (state, action) => {
            state.store = action.payload
        },
        GET_TOTALPAGES: (state, action) => {
            state.totalPages = action.payload
        },
        UPDATE_STORE: (state, action) => {
            const id = action.payload.id
            const { form } = action.payload

            if (form) {
                const name = form.get("name")
                const city = form.get("city")
                const updateStore = state.store.map(item =>
                    item._id === id ? { ...item, name, city } : item
                )
                state.store = updateStore
            }
        }
    }
})

const { reducer, actions } = slice

export const { SET_LOADING, CREATE_STORE, HANDLE_DELETE, GET_STORE, GET_TOTALPAGES, UPDATE_STORE } = actions
export default reducer;