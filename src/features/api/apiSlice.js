import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"


const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: "/functions" }),
    endpoints: builder => ({
        addToCart: builder.mutation({
            query: body => ({
                url: "/addToCart",
                method: "POST",
                body
            })
        })
    })
})


export const { useAddToCartMutation } = apiSlice
export default apiSlice