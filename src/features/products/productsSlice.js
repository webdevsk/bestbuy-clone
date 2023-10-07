import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const productsSlice = createSlice({
    name: "products",
    initialState: {
        status: "idle",
        data: {},
        error: null,
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => { state.status = "loading" })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                console.log(action)
                state.status = "success"
                state.data = action.payload.data
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message ?? action.error.code
            })
    }
})

export const selectProductsData = () => (state) => state.products.data
export const selectProductsByCategory = term => state => state.products.data.products.filter(product => product.category === term)

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {

    const response = await axios('https://dummyjson.com/products')
    console.log(response)
    return response
})

export const { addProducts } = productsSlice.actions
export default productsSlice.reducer