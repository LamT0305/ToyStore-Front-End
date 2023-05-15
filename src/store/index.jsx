import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice"

const rootReducer = {
    Auth: AuthSlice
}

const customizeMiddleWare = getDefaultMiddleware({
    serializableCheck: false
})

export default configureStore({
    middleware: customizeMiddleWare,
    reducer: rootReducer,
});