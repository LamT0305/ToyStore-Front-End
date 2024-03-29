import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice"
import CategorySlice from "./CategorySlice"
import ToySlice from "./ProductSlice"
import StoreSlice from "./StoreSlice"
import InventorySlice from "./InventorySlice"
import CartSlice from "./CartSlice"

const rootReducer = {
    Auth: AuthSlice,
    category: CategorySlice,
    toys: ToySlice,
    store: StoreSlice,
    inventories: InventorySlice,
    cart: CartSlice
}

const customizeMiddleWare = getDefaultMiddleware({
    serializableCheck: false
})

export default configureStore({
    middleware: customizeMiddleWare,
    reducer: rootReducer,
});