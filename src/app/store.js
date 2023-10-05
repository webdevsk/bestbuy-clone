import { configureStore } from "@reduxjs/toolkit";
import cartItemsSlice from "../features/cartItems/cartItemsSlice";

export default configureStore({
    reducer: {
        cartItems: cartItemsSlice
    }
});
