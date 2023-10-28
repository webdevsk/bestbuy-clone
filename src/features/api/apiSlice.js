import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"


const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_SERVER_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token
            // console.log(token)
            if (token) {
                headers.set("authorization", `Bearer ${token}`)
            }
            return headers
        }
    }),
    endpoints: builder => ({
        getProducts: builder.query({
            query: () => ({
                url: "/products",
            })
        }),
        addToCart: builder.mutation({
            query: body => ({
                url: "/cart",
                method: "PATCH",
                body
            })
        })
    })
})


export const { useGetProductsQuery, useAddToCartMutation } = apiSlice
export default apiSlice