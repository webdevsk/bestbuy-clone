import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default async (req) => {
    const { email: userEmail, productKey, quantity = 1 } = await req.json()
    console.log("cart/post", userEmail, productKey, quantity)

    try {
        const result = await prisma.cart.upsert({
            where: {
                userEmail_productKey: { userEmail, productKey }
            },
            update: { quantity },
            create: { userEmail, productKey, quantity },
        })
        return Response.json(result)
    } catch (error) {
        console.error(error)
        return Response.json(error, { status: 500 })
    }
}