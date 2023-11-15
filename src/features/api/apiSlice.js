import { createEntityAdapter, createSelector } from "@reduxjs/toolkit"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const productsAdapter = createEntityAdapter()
const initialState = productsAdapter.getInitialState({
    total: null,
    skip: null,
    limit: null,
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
            query: () => `/products`,
            transformResponse: response => (
                productsAdapter.setAll(
                    {
                        ...initialState,
                        total: response.total,
                        skip: response.skip,
                        limit: response.limit,
                    },
                    response.products)
            ),
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
        })
    })
})

export const selectProductsResult = apiSlice.endpoints.getProducts.select()
const selectProducts = createSelector(
    selectProductsResult, productsResult => productsResult.data
)

export const {
    selectAll: selectAllProducts,
    selectById: selectProductById,
    selectEntities: selectProductEntities,
    selectIds: selectProductIds,
    selectTotal: selectProductsTotal
} = productsAdapter.getSelectors(state => selectProducts(state) ?? initialState)
export const { useGetProductsQuery, useAddToCartMutation, useGetCartItemsQuery } = apiSlice
export default apiSlice