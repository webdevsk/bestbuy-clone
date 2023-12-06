import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default async (event) => {
    const url = new URL(event.url)
    let { limit = "30", skip = "0", category, brand, rating, price, sortby } = Object.fromEntries(url.searchParams)
    console.log("getProducts", url.searchParams.toString())
    limit = parseInt(limit)
    skip = parseInt(skip)
    // gte: greater than or equal to / lte: less than or equal to
    const [ratingGte, ratingLte] = !rating
        ? [undefined, undefined]
        : rating.split("to").map(value =>
            isNaN(parseFloat(value))
                ? undefined
                : parseFloat(value)
        )

    const [priceGte, priceLte] = !price
        ? [undefined, undefined]
        : price.split("to").map(value =>
            isNaN(parseFloat(value))
                ? undefined
                : parseFloat(value)
        )

    const orderBy = !sortby || sortby === "best-match"
        ? undefined
        : {
            rating: sortby === "rating-low-to-high"
                ? "asc"
                : sortby === "rating-high-to-low"
                    ? "desc"
                    : undefined,
            price: sortby === "price-low-to-high"
                ? "asc"
                : sortby === "price-high-to-low"
                    ? "desc"
                    : undefined
        }

    try {
        const products = await prisma.product.findMany({
            where: {
                brand,
                category,
                rating: { gte: ratingGte, lte: ratingLte },
                price: { gte: priceGte, lte: priceLte },
            },
            take: limit,
            skip,
            orderBy

        })
        return Response.json({ products, skip, limit })
    } catch (error) {
        console.error(error)
        return Response.json({ message: error }, { status: 500 })
    }
}