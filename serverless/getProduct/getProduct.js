import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default async (event, context) => {
    const url = new URL(event.url)
    console.log(url.pathname)
    // If the last one is empty string we get the one before it
    // We get empty string when pathname ends with an extra "/"
    const productKey = url.pathname.split("/").at(-1) || url.pathname.split("/").at(-2)
    console.log("getProduct/" + productKey)
    try {
        const result = await prisma.product.findUnique({
            where: { productKey }
        })
        return Response.json(result)
    } catch (error) {
        console.error(error)
        return Response.json({ message: error }, { status: 500 })
    }
}