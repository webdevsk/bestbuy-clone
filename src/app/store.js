import { configureStore } from "@reduxjs/toolkit"
import cartItemsSlice from "../features/cart/cartItemsSlice"
import apiSlice from "../features/api/apiSlice"
import authSlice from "../features/account/authSlice"

export default configureStore({
    reducer: {
        cartItems: cartItemsSlice,
        auth: authSlice,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware)

})
