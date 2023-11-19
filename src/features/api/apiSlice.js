import { createEntityAdapter, createSelector } from "@reduxjs/toolkit"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { toast } from "react-toastify"

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
            onQueryStarted: optUpdateCart((args, draft) => {
                const product = draft.products.find(prod => prod.id === args.itemId)
                if (product) product.quantity = args.quantity
            })
        }),

        deleteCartItems: builder.mutation({
            query: body => ({
                url: `/cart`,
                method: "DELETE",
                body
            }),
            onQueryStarted: optUpdateCart((args, draft) => {
                draft.products = draft.products.filter(prod => !(args.itemIds.some(id => id === prod.id)))
                draft.quantity -= args.itemIds.length
            })
        }),
    })
})

// Higher order function to make optimistic updates on Cart endpoints
// If the parameters of getCartItems changes, reflect the change on updateQueryData's second parameter as well.
function optUpdateCart(callback) {
    return async (params, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
            apiSlice.util.updateQueryData("getCartItems", params.email, draft => callback(params, draft))
        )
        try {
            await queryFulfilled
        } catch (error) {
            patchResult.undo()
            console.error(error?.message)
            toast.error("Failed to update cart. Server Error.")
        }
    }
}

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


export const { useGetProductsQuery, useAddToCartMutation, useGetCartItemsQuery, useUpdateCartItemMutation, useDeleteCartItemsMutation } = apiSlice
// export const useGetCartItemsState = apiSlice.endpoints.getCartItems.useQueryState
export default apiSlice