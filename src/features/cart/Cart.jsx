import { Button, Typography } from "@material-tailwind/react"
import { useDispatch, useSelector } from "react-redux"
import { IoIosAdd, IoIosClose, IoIosRemove } from "react-icons/io"
import { Link } from "react-router-dom"
import {
  decreaseCount,
  increaseCount,
  removeFromCart,
  selectAllCartItems,
} from "./cartItemsSlice"
import { memo, useCallback, useMemo } from "react"
import BadgeCounter from "../../components/common/BadgeCounter"
import { useGetCartItemsQuery, useGetProductsQuery } from "../api/apiSlice"
import { useAuth0 } from "@auth0/auth0-react"

const Cart = memo(({ closeDrawer }) => {
  const locale = "en-US"
  const currency = "USD"
  const { isAuthenticated, user } = useAuth0()

  const { products } = useGetProductsQuery().data ?? []

  const dispatch = useDispatch()

  const {
    isError,
    isLoading,
    isSuccess,
    data: cartItems = [],
  } = useGetCartItemsQuery(user?.email, {
    skip: !isAuthenticated,
  })
  console.log(cartItems)

  const cartProducts = useMemo(() => {
    console.log("cartProducts Arr regenerated")
    return cartItems.map(({ itemId, quantity }) => ({
      ...products[itemId],
      quantity: quantity,
    }))
  }, [cartItems, products])
  console.log(cartProducts)

  const format = useCallback(
    (args) =>
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currency,
      }).format(args),
    [locale, currency],
  )

  const totalPrice = useMemo(() => {
    console.log("TotalPrice recalculated")
    return cartProducts.reduce(
      (total, product) => total + product.price * product.quantity,
      0,
    )
  }, [cartProducts])

  return (
    <>
      <div className="sticky top-0 z-[1] flex items-center justify-between rounded-t-xl border-b bg-white p-4 pb-4 shadow">
        <BadgeCounter>
          <Typography variant="h3">Cart</Typography>
        </BadgeCounter>
        <button onClick={closeDrawer} className="rounded-sm hover:bg-gray-100">
          <IoIosClose className="h-6 w-6" />
        </button>
      </div>
      {cartProducts.length === 0 && (
        <div className="my-auto text-center">
          <p className="text-2xl font-bold text-gray-400">
            Cart is Empty ＞︿＜
          </p>
        </div>
      )}
      <div className="flex flex-col gap-2 p-4">
        {cartProducts.map((item) => (
          <div key={item.id} className={`rounded-md bg-gray-50 p-2`}>
            <div className="flex flex-wrap gap-2">
              <Link to={`/product/${item.label}`} className="block w-20">
                <img
                  className="aspect-video h-full w-full object-contain"
                  src={item.images.at(-1)}
                />
              </Link>
              <div className="flex w-1 grow flex-col gap-2">
                <div className="flex w-full items-center">
                  <Typography variant="h6" className="">
                    {item.title}
                  </Typography>

                  <button
                    className="ms-auto rounded-sm p-1 transition-colors hover:bg-gray-200"
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    <IoIosClose className="scale-150" />
                  </button>
                </div>
                <div className="flex items-center justify-between gap-1">
                  <Typography variant="paragraph" className="">
                    {format(item.price)}
                  </Typography>

                  <div className="flex items-center">
                    <button
                      disabled={item.quantity === 1}
                      onClick={() => dispatch(decreaseCount(item.id))}
                      className="bg-gray-200 transition-colors hover:bg-gray-300 disabled:opacity-50"
                    >
                      <IoIosRemove className="text-xl" />
                    </button>
                    <Typography className="min-w-[2rem] text-center">
                      {item.quantity}
                    </Typography>
                    <button
                      disabled={item.quantity === 10}
                      onClick={() => dispatch(increaseCount(item.id))}
                      className="bg-gray-200 transition-colors hover:bg-gray-300 disabled:opacity-50"
                    >
                      <IoIosAdd className="text-xl" />
                    </button>
                  </div>

                  <div className="">
                    <Typography variant="h4">
                      {format(item.price * (item.quantity ?? 1))}
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="sticky bottom-0 z-[1] mt-auto border-t bg-white p-4 shadow">
        <div className="mb-2 flex items-center justify-between gap-2">
          <Typography variant="h4">Total</Typography>
          <Typography variant="h3">{format(totalPrice)}</Typography>
        </div>
        <Button
          className={`w-full bg-accent text-black shadow-sm transition hover:shadow-sm hover:contrast-125`}
        >
          <Typography variant="h6">Checkout</Typography>
        </Button>
      </div>
    </>
  )
})

Cart.displayName = "Cart"
export default Cart
