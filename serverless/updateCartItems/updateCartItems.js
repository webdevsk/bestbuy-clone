import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default async (req) => {
    const { email: userEmail, itemId, quantity = 1 } = await req.json()
    console.log("cart/post", userEmail, itemId, quantity)

    try {
        const result = await prisma.cart.upsert({
            where: {
                userEmail_itemId: { userEmail, itemId }
            },
            update: { quantity },
            create: { userEmail, itemId, quantity },
        })

        return Response.json(result)
    } catch (error) {
        return Response.json(error, { status: 500 })
    }
}