import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice"
import CategorySlice from "./CategorySlice"
import ToySlice from "./ProductSlice"

const rootReducer = {
    Auth: AuthSlice,
    category: CategorySlice,
    toys: ToySlice
}

const customizeMiddleWare = getDefaultMiddleware({
    serializableCheck: false
})

export default configureStore({
    middleware: customizeMiddleWare,
    reducer: rootReducer,
});