import { configureStore } from "@reduxjs/toolkit"
import cartItemsSlice from "../features/cart/cartItemsSlice"
import productsSlice from "../features/products/productsSlice"
import apiSlice from "../features/api/apiSlice"
import authSlice from "../features/account/authSlice"

export default configureStore({
    reducer: {
        cartItems: cartItemsSlice,
        products: productsSlice,
        auth: authSlice,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware)

})
