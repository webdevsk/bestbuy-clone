import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async (event, context) => {
    // const body = await event.json()
    const { email } = await event.json()
    console.log("getCartItems/", email)

    if (!email) return Response.json({ message: "Email not provided" }, { status: 400 })

    try {
        const result = await prisma.user.upsert({
            where: { email },
            select: {
                cart: {
                    select: {
                        itemId: true,
                        quantity: true
                    }
                }
            },
            update: {},
            create: { email }
        })

        const productsData = await fetch('https://dummyjson.com/products?limit=0')
        const { products } = await productsData.json()

        const populatedCartProducts = result.cart.map(({ itemId, quantity }) => ({
            ...products.find(prod => prod.id === itemId),
            quantity
        }))
        return Response.json({
            products: populatedCartProducts,
            quantity: populatedCartProducts.length
        })
    }
    catch (error) {
        console.log(error)
        return Response.json({ message: error?.message }, { status: 500 })
    }
}