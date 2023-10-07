import { configureStore } from "@reduxjs/toolkit"
import cartItemsSlice from "../features/cartItems/cartItemsSlice"
import productsSlice from "../features/products/productsSlice"

export default configureStore({
    reducer: {
        cartItems: cartItemsSlice,
        products: productsSlice
    }
})
