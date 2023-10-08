import { createAsyncThunk, createEntityAdapter, createSelector, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const productsAdapter = createEntityAdapter()

const initialState = productsAdapter.getInitialState({
    status: "idle",
    total: null,
    skip: null,
    limit: null,
    error: null,
})

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = "loading"
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = "success"
                productsAdapter.upsertMany(state, action.payload.products)
                delete action.payload.products
                Object.assign(state, action.payload)
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message ?? action.error.code
            })
    }
})
console.log(productsAdapter.getSelectors(state => state.products))
export const {
    selectAll: selectAllProducts,
    selectById: selectProductById,
    selectEntities: selectProductsEntities,
    selectIds: selectProductsIds,
    selectTotal: selectProductsTotal
} = productsAdapter.getSelectors(state => state.products)

export const selectProductsByCategory = createSelector([
    selectAllProducts, (state, category) => category
],
    (products, category) => {
        console.log("selector running")
        console.log(products)
        return products.filter(product => product.category === category)
    })

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await axios('https://dummyjson.com/products')
    return response.data
})

export const { addProducts } = productsSlice.actions
export default productsSlice.reducer