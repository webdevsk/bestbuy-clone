import { configureStore } from "@reduxjs/toolkit"
import apiSlice from "../features/api/apiSlice"
import authSlice from "../features/auth/authSlice"

export default configureStore({
    reducer: {
        auth: authSlice,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware)

})
