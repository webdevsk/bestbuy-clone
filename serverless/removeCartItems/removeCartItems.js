import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default async (req) => {
    const { email: userEmail, productKeys, deleteAll = false } = await req.json()
    console.log("cart/delete", userEmail, productKeys, deleteAll)

    try {
        const result = await prisma.cart.deleteMany({
            where: {
                userEmail,
                productKey: deleteAll ? undefined : {
                    in: productKeys
                }
            }
        })
        return Response.json(result)
    } catch (error) {
        console.error(error)
        return Response.json({ status: error?.status }, { status: 500 })
    }
}