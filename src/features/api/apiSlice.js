import { createEntityAdapter, createSelector } from "@reduxjs/toolkit"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const productsAdapter = createEntityAdapter()
const initialState = productsAdapter.getInitialState({
    total: null,
    skip: null,
    limit: null,
    categories: [],
    brands: [],
    exclusiveProducts: []
})

const apiSlice = createApi({
    reducerPath: "api",
    tagTypes: ['Cart'],
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_SERVER_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token
            if (token) {
                headers.set("authorization", `Bearer ${token}`)
            }
            return headers
        }
    }),
    endpoints: builder => ({
        getProducts: builder.query({
            query: (params) => ({
                url: `/products`,
                params
            }),

            transformResponse: response => {
                const { products, ...rest } = response
                return productsAdapter.setAll({ ...initialState, ...rest }, products)
            },
            keepUnusedDataFor: 600
        }),

        getCartItems: builder.query({
            query: (email) => `/cart/${email}`,
            providesTags: ['Cart']
        }),

        addToCart: builder.mutation({
            query: body => ({
                url: "/cart",
                method: "POST",
                body
            }),
            invalidatesTags: ['Cart']
        }),

        updateCartItem: builder.mutation({
            query: body => ({
                url: `/cart`,
                method: "PATCH",
                body
            }),
            invalidatesTags: ['Cart']
        }),

        deleteCartItem: builder.mutation({
            query: body => ({
                url: `/cart`,
                method: "DELETE",
                body
            }),
            invalidatesTags: ['Cart']
        }),
    })
})

export const selectProductsResult = apiSlice.endpoints.getProducts.select()
const selectProductsData = createSelector(
    selectProductsResult, productsResult => productsResult.data ?? initialState
)

export const {
    selectAll: selectAllProducts,
    selectById: selectProductById,
    selectEntities: selectProductEntities,
    selectIds: selectProductIds,
    selectTotal: selectProductsTotal
} = productsAdapter.getSelectors(state => selectProductsData(state))

export const selectProductBrands = createSelector(selectProductsData, state => state.brands)
export const selectProductCategories = createSelector(selectProductsData, state => state.categories)
export const selectExclusiveProducts = createSelector(selectProductsData, state => state.exclusiveProducts)


export const { useGetProductsQuery, useAddToCartMutation, useGetCartItemsQuery, useUpdateCartItemMutation } = apiSlice
export default apiSlice