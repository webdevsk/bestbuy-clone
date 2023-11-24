import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

const getCartFromPrisma = async (email) => {
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
        return result.cart
    } catch (error) {
        console.log(error)
    }
}

const getAllProducts = async () => {
    try {

        const productsData = await fetch('https://dummyjson.com/products?limit=0')
        const { products } = await productsData.json()
        return products
    } catch (error) {
        console.log(error)
    }
}
export default async (event) => {
    const { email } = await event.json()
    console.log("getCartItems/", email)
    if (!email) return Response.json({ message: "Email not provided" }, { status: 400 })

    try {
        const [cart, products] = await Promise.all([getCartFromPrisma(email), getAllProducts()])
        const populatedCartProducts = cart.map(({ itemId, quantity }) => ({
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
