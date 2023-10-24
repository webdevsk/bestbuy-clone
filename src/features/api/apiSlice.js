import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"


const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: "/.netlify/functions" }),
    endpoints: builder => ({
        getProducts: builder.query({
            query: () => "/getProducts"
        }),
        addToCart: builder.mutation({
            query: body => ({
                url: "/addToCart",
                method: "POST",
                body
            })
        })
    })
})


export const { useGetProductsQuery, useAddToCartMutation } = apiSlice
export default apiSlice