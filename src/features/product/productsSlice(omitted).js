import { createAsyncThunk, createEntityAdapter, createSelector, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const productsAdapter = createEntityAdapter()

const initialState = productsAdapter.getInitialState({
    status: "idle",
    total: null,
    skip: null,
    limit: null,
    error: null,
    categories: [],
    brands: []
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

                state.categories.push(...new Map(action.payload.products.map((item) => [item["category"], item])).keys())

                state.brands.push(...new Map(action.payload.products.map((item) => [item["brand"], item])).keys())

                delete action.payload.products
                Object.assign(state, action.payload)
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message ?? action.error.code
            })
    }
})

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
        console.log("Category selector running")
        return products.filter(product => product.category === category)
    })

export const selectProductsByBrand = createSelector([
    selectAllProducts, (state, brand) => brand
],
    (products, brand) => {
        console.log("Brand selector running")
        return products.filter(product => product.brand === brand)
    })

export const selectExclusiveProducts = createSelector([
    selectAllProducts
], (products) => {
    console.log("Calculating exclusive products")
    return products.filter(product => product.discountPercentage >= 10 &&
        (product.category === "smartphones" ||
            product.category === "laptops"))
})

export const selectProductCategories = state => state.products.categories
export const selectProductBrands = state => state.products.brands

export const fetchProducts = createAsyncThunk('productsGallery/fetchProducts', async () => {
    const response = await axios('https://dummyjson.com/products')
    return response.data
})

export const { addProducts } = productsSlice.actions
export default productsSlice.reducer