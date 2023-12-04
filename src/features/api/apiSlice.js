import { createEntityAdapter, createSelector } from "@reduxjs/toolkit"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { toast } from "react-toastify"

const productsAdapter = createEntityAdapter()
const initialState = productsAdapter.getInitialState()

const apiSlice = createApi({
    reducerPath: "api",
    tagTypes: ['Cart'],
    baseQuery: fetchBaseQuery({
        baseUrl: "/.netlify/functions/",
        prepareHeaders: (headers) => {
            headers.set("Content-Type", "application/json")
            return headers
        },
        // prepareHeaders: (headers, { getState }) => {
        //     const token = getState().auth.token
        //     if (token) {
        //         headers.set("authorization", `Bearer ${token}`)
        //     }
        //     return headers
        // }
    }),
    endpoints: builder => ({
        getProducts: builder.query({

            query: (params = {}) => ({
                url: `/getProducts`,
                params
            }),

            transformResponse: response => {
                const { products, ...rest } = response
                return productsAdapter.setAll({ ...initialState, ...rest }, products)
            },
            keepUnusedDataFor: 600

        }),

        getProduct: builder.query({
            query: (productKey) => `/getProduct/${productKey}`,
            // providesTags: (id) => 
        }),

        getCategories: builder.query({
            query: () => "https://dummyjson.com/products/categories"
        }),

        getCartItems: builder.query({
            query: (email) => ({
                url: `/getCartItems`,
                params: { email }
            }),
            providesTags: ['Cart']
        }),

        addToCart: builder.mutation({
            query: body => ({
                url: "/updateCartItems",
                method: "POST",
                body
            }),
            onQueryStarted: async (_, { queryFulfilled }) => {
                await toast.promise(queryFulfilled, {
                    pending: "Adding to Cart",
                    success: {
                        render: () => "Successfully added to Cart",
                    },
                    error: {
                        render: ({ data }) => {
                            console.log(data)
                            return `Failed to add to Cart. ${data?.error?.status}`
                        }
                    }
                })
            },
            invalidatesTags: ['Cart']
        }),

        updateCartItem: builder.mutation({
            query: body => ({
                url: `/updateCartItems`,
                method: "PATCH",
                body
            }),
            onQueryStarted: optUpdateCart((args, draft) => {
                const product = draft.products.find(prod => prod.productKey === args.productKey)
                if (product) product.quantity = args.quantity
            })
        }),

        deleteCartItems: builder.mutation({
            query: body => ({
                url: `/removeCartItems`,
                method: "DELETE",
                body
            }),
            onQueryStarted: optUpdateCart((args, draft) => {
                draft.products = args.deleteAll ? [] : draft.products.filter(prod => !(args.productKeys.some(key => key === prod.productKey)))
                draft.quantity = args.deleteAll ? 0 : draft.quantity - args.productKeys.length
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
            console.error(error)
            toast.error(`Failed to update cart. ${error?.message}.`)
        }
    }
}

export const selectProductCategories = createSelector(
    apiSlice.endpoints.getCategories.select(),
    categoriesResult => categoriesResult.data ?? []
)

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

export const selectProductBrands = createSelector(
    selectAllProducts,
    products => [...new Set(products.map(item => item.brand))]
)

export const selectExclusiveProducts = createSelector(
    selectAllProducts,
    products => products.filter(product =>
        product.discountPercentage >= 10 && ["smartphones", "laptops"].some(cat => product.category === cat)
    )
)

export const {
    useGetProductsQuery,
    useGetProductQuery,
    useGetCategoriesQuery,
    useGetCartItemsQuery,
    useAddToCartMutation,
    useUpdateCartItemMutation,
    useDeleteCartItemsMutation
} = apiSlice
export default apiSlice

export const useGetProductsQueryState = apiSlice.endpoints.getProducts.useQueryState