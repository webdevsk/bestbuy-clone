import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const productsSlice = createSlice({
    name: "products",
    initialState: {
        status: "idle",
        data: {
            products: [],
            total: null,
            skip: null,
            limit: null
        },
        error: null,
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = "loading"
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = "success"
                state.data = action.payload
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message ?? action.error.code
            })
    }
})

export const selectProducts = state => state.products.data.products
export const selectProductsByCategory = createSelector([
    selectProducts, (state, category) => category
],
    (products, category) => {
        console.log("selector running")
        return products.filter(product => product.category === category)
    })
// export const selectProductsByCategory = (state, category) = state.products.data.products.filter(product => product.category === category)

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await axios('https://dummyjson.com/products')
    return response.data
})

export const { addProducts } = productsSlice.actions
export default productsSlice.reducer