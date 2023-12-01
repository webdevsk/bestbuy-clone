import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default async (event) => {
    const url = new URL(event.url)
    let { limit = "30", skip = "0", category, brand, rating, price } = Object.fromEntries(url.searchParams)
    console.log("getProducts", url.searchParams.toString())
    try {
        limit = parseInt(limit)
        skip = parseInt(skip)
        // gte: greater than or equal to / lte: less than or equal to
        const [ratingGte, ratingLte] = !rating ? [undefined, undefined] : rating.split("to").map(value => isNaN(parseFloat(value)) ? undefined : parseFloat(value))

        const [priceGte, priceLte] = !price ? [undefined, undefined] : price.split("to").map(value => isNaN(parseFloat(value)) ? undefined : parseFloat(value))

        const products = await prisma.product.findMany({
            where: {
                brand,
                category,
                rating: { gte: ratingGte, lte: ratingLte },
                price: { gte: priceGte, lte: priceLte },
            },
            take: limit,
            skip
        })
        console.log("Products length: " + products.length)
        return Response.json({ products, skip, limit })
    } catch (error) {
        console.error(error)
        return Response.json({ message: error }, { status: 500 })
    }
}