import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default async (event) => {
    const url = new URL(event.url)
    const { email } = Object.fromEntries(url.searchParams)
    console.log("getCartItems/", email)

    if (!email) return Response.json({ message: "Email not provided" }, { status: 400 })

    try {
        const cartItems = await getCartItems(email)
        if (!cartItems.length) return Response.json({ products: [], quantity: 0 })

        const [cartKeys, cartEntities] = cartItems.reduce((final, current) => {
            final[0].push(current.productKey)
            Object.assign(final[1], { [current.productKey]: current })
            return final
        }, [[], {}])

        const productEntities = await getFullProductEntities(cartKeys)

        const populatedCartProducts = productEntities.map((product) => ({
            ...product,
            ...cartEntities[product.productKey],
        }))

        return Response.json({
            products: populatedCartProducts,
            quantity: populatedCartProducts.length
        })
    }
    catch (error) {
        console.error(error)
        return Response.json({ message: error?.message }, { status: 500 })
    }
}


async function getCartItems(email) {
    try {
        const result = await prisma.user.upsert({
            where: { email },
            select: {
                cart: {
                    select: {
                        productKey: true,
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

async function getFullProductEntities(productKeys) {
    try {
        const products = await prisma.product.findMany({
            where: {
                productKey: {
                    in: productKeys
                }
            }
        })

        console.log(products)
        return products
    } catch (error) {
        console.error(error)
    }
}


