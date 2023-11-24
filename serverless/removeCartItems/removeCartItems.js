import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default async (req) => {
    const { email: userEmail, itemIds, deleteAll = false } = await req.json()
    console.log("cart/delete", userEmail, itemIds, deleteAll)

    const condition = deleteAll ? { userEmail } : { itemId: { in: itemIds } }
    try {
        const result = await prisma.cart.deleteMany({ where: condition })
        return Response.json(result)

    } catch (error) {
        console.error(error)
        return Response.json({ status: error?.status }, { status: 500 })

    }
}