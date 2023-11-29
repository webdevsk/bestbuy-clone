import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default async (event, context) => {
    const url = new URL(event.url)
    let { limit = "30", skip = "0", category, brand, rating } = Object.fromEntries(url.searchParams)
    console.log("getProducts", url.searchParams.toString())
    try {
        limit = parseInt(limit)
        skip = parseInt(skip)
        const [gte, lte] = rating.split("-").map(value => parseFloat(value) ?? undefined)

        const products = await prisma.product.findMany({
            where: {
                brand,
                category,
                rating: { gte, lte }
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