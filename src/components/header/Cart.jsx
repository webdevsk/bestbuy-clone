import { Button, Typography } from "@material-tailwind/react"
import { IoIosAdd, IoIosClose, IoIosRemove } from "react-icons/io"
import { Link } from "react-router-dom"
import { memo, useCallback, useMemo, useState } from "react"
import BadgeCounter from "../common/BadgeCounter"
import {
  useDeleteCartItemsMutation,
  useGetCartItemsQuery,
  useUpdateCartItemMutation,
} from "../../features/api/apiSlice"
import { useAuth0 } from "@auth0/auth0-react"

const Cart = memo(({ isOpen, closeDrawer }) => {
  // mark and delete to be implemented later
  const [selectedIds, setSelectedIds] = useState([])

  const locale = "en-US"
  const currency = "USD"
  const { isAuthenticated, user } = useAuth0()

  const {
    isLoading,
    isError,
    isSuccess,
    isFetching,
    data: cartData = {
      products: [],
    },
  } = useGetCartItemsQuery(user?.email, {
    skip: !isAuthenticated || !user,
  })
  // Drawer from MaterialTailwind renders even when state is false
  // add !isOpen to the skip condition if you want to delay fetch until the drawer is actually open

  const [deleteCartItems] = useDeleteCartItemsMutation()

  const handleDelete = async ({ currentTarget: t }) => {
    const value = t.value ? parseInt(t.value) : null
    const itemIds = []
    if (t.name === "deleteOne") itemIds.push(t.value)
    try {
      await deleteCartItems({
        email: user.email,
        itemIds:
          t.name === "deleteOne"
            ? [value]
            : t.name === "deleteMany"
            ? selectedIds
            : [],
        deleteAll: t.name === "deleteAll",
      }).unwrap()
    } catch (error) {
      console.error("Error deleting cart items.", error)
    }
  }

  const format = useCallback(
    (args) =>
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currency,
      }).format(args),
    [locale, currency],
  )

  // Calculating total price clientside
  const totalPrice = useMemo(() => {
    return cartData.products.reduce(
      (total, product) => total + product.price * product.quantity,
      0,
    )
  }, [cartData.products])

  return (
    <>
      <div className="sticky top-0 z-[1] flex items-center justify-between rounded-t-xl border-b bg-white p-4 pb-4 shadow">
        <div className="flex items-center">
          <Typography variant="h3">Cart</Typography>
          <BadgeCounter>{cartData.quantity ?? 0}</BadgeCounter>
        </div>
        <button onClick={closeDrawer} className="rounded-sm hover:bg-gray-100">
          <IoIosClose className="h-6 w-6" />
        </button>
      </div>

      {isLoading && !cartData.products.length && (
        <div className="my-auto text-center">
          <p className="animate-pulse text-2xl font-bold text-gray-400">
            Fetching Cart Items...
          </p>
        </div>
      )}

      {isError && (
        <div className="my-auto text-center">
          <p className="text-2xl font-bold text-red-500">
            Error fetching Cart items
          </p>
        </div>
      )}

      {isSuccess && !cartData.products.length && (
        <div className="my-auto text-center">
          <p className="text-2xl font-bold text-gray-400">
            Cart is Empty ＞︿＜
          </p>
        </div>
      )}

      <div className="flex flex-col gap-2 p-4">
        {cartData.products.map((item) => (
          <div
            key={item.id}
            className={`rounded-md bg-gray-50 p-2 ${
              isFetching ? "animate-pulse opacity-70" : ""
            }`}
          >
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
                    name="deleteOne"
                    onClick={handleDelete}
                    value={item.id}
                  >
                    <IoIosClose className="scale-150" />
                  </button>
                </div>
                <div className="flex items-center justify-between gap-1">
                  <Typography variant="paragraph" className="">
                    {format(item.price)}
                  </Typography>

                  <div className="flex items-center">
                    <CartItemMutator
                      quantity={item.quantity}
                      email={user.email}
                      itemId={item.id}
                    />
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
          <Typography variant="h3">{format(totalPrice ?? 0)}</Typography>
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

const CartItemMutator = ({ email, itemId, quantity }) => {
  const [updateQuantity] = useUpdateCartItemMutation()

  const minAllowed = 1
  const maxAllowed = 10

  const handleQuantity = async ({ currentTarget: t }) => {
    const value = t.value ? parseInt(t.value) : null

    if (t.name === "increment" && quantity === maxAllowed) return
    if (t.name === "decrement" && quantity === minAllowed) return
    if (
      t.name === "manualInput" &&
      (t.value < minAllowed || t.value > maxAllowed)
    )
      return

    try {
      await updateQuantity({
        email,
        itemId,
        quantity:
          t.name === "increment"
            ? ++quantity
            : t.name === "decrement"
            ? --quantity
            : t.name === "manualInput"
            ? value
            : quantity,
      }).unwrap()
    } catch (error) {
      console.error("Failed to update quantity.")
      console.error(error)
    }
  }

  return (
    <>
      <button
        disabled={quantity === 1}
        name="decrement"
        className="bg-gray-200 transition-colors hover:bg-gray-300 disabled:opacity-50"
        onClick={handleQuantity}
      >
        <IoIosRemove className="text-xl" />
      </button>
      <Typography className="min-w-[2rem] text-center">{quantity}</Typography>
      <button
        disabled={quantity === 10}
        name="increment"
        className="bg-gray-200 transition-colors hover:bg-gray-300 disabled:opacity-50"
        onClick={handleQuantity}
      >
        <IoIosAdd className="text-xl" />
      </button>
    </>
  )
}
