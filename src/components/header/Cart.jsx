import { Button } from "@material-tailwind/react"
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
import { IoCheckmarkCircleSharp, IoCloseSharp } from "react-icons/io5"
import { Switch } from "@headlessui/react"

const Cart = memo(({ isOpen, setIsOpen }) => {
  const [showSelection, setShowSelection] = useState(false)
  // mark and delete to be implemented later
  const [selected, setSelected] = useState([])

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
            ? selected
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

  function handleShow() {
    setShowSelection((state) => !state)
    // resetting the list
    setSelected((state) => (showSelection ? [] : state))
  }

  function handleSelection(checked, itemId) {
    checked
      ? setSelected((selected) => [...selected, itemId])
      : setSelected((selected) => selected.filter((id) => itemId !== id))
  }

  return (
    <>
      <div
        className={`sticky top-0 z-[1] flex items-center  border-b p-4 pb-4 shadow ${
          showSelection ? "bg-red-50" : "bg-white"
        }`}
      >
        <div className="flex items-center">
          <h3>{showSelection ? "Selected" : "Cart"}</h3>
          <BadgeCounter className={showSelection && "bg-error text-white"}>
            {showSelection ? selected.length : cartData.quantity ?? 0}
          </BadgeCounter>
        </div>

        <button className="me-4 ms-auto text-red-700" onClick={handleShow}>
          <small>{!showSelection ? "Batch Selection" : "Cancel"}</small>
        </button>
        <button
          onClick={() => setIsOpen(false)}
          className="rounded-sm hover:bg-gray-100"
        >
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
        {cartData.products?.map((item) => (
          <div
            key={item.id}
            className={`rounded-md p-2 ${
              isFetching ? "animate-pulse opacity-70" : ""
            } ${
              showSelection && selected.includes(item.id)
                ? "bg-gray-300 shadow-inner [&_img]:blur-sm"
                : "bg-gray-50"
            }`}
          >
            <div className="flex flex-wrap gap-2">
              <Link
                to={`/product/${item.id}`}
                className="block w-20"
                onClick={() => setIsOpen(false)}
              >
                <img
                  className="aspect-video h-full w-full object-contain"
                  src={item.images?.at(-1)}
                />
              </Link>
              <div className="flex w-1 grow flex-col gap-2">
                <div className="flex w-full">
                  <h6 className="leading-normal">{item.title}</h6>
                  {!showSelection && (
                    <button
                      className="ms-auto grid h-6 w-6 place-items-center rounded-full border-2 bg-transparent transition-colors hover:bg-white"
                      name="deleteOne"
                      onClick={handleDelete}
                      value={item.id}
                    >
                      <IoCloseSharp />
                    </button>
                  )}
                  {showSelection && (
                    <Switch
                      title={
                        selected.includes(item.id) ? "Unmark item" : "Mark item"
                      }
                      checked={selected.includes(item.id)}
                      onChange={(checked) => handleSelection(checked, item.id)}
                      name={"Mark Item"}
                      className={`ms-auto grid h-6 w-6 place-items-center rounded-full border-2 bg-white text-xl text-error`}
                    >
                      <span className="sr-only">Mark item</span>
                      <IoCheckmarkCircleSharp
                        className={`fill-current transition-opacity ${
                          selected.includes(item.id)
                            ? "opacity-100"
                            : "opacity-0 hover:opacity-50"
                        }`}
                      />
                    </Switch>
                  )}
                </div>
                <div className="flex items-center justify-between gap-1">
                  <p className="">{format(item.price)}</p>

                  <div className="flex items-center">
                    <CartItemMutator
                      quantity={item.quantity}
                      email={user.email}
                      itemId={item.id}
                    />
                  </div>

                  <div className="">
                    <h4>{format(item.price * (item.quantity ?? 1))}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div
        className={`sticky bottom-0 z-[1] mt-auto border-t  p-4 shadow ${
          showSelection ? "bg-red-50" : "bg-white"
        }`}
      >
        <div className="mb-2 flex items-center justify-between gap-2">
          <h4>Total</h4>
          <h3>{format(totalPrice ?? 0)}</h3>
        </div>
        {!showSelection && (
          <Button
            className={`w-full bg-accent text-body shadow-sm transition hover:shadow-sm hover:contrast-125`}
          >
            <h6>Checkout</h6>
          </Button>
        )}

        {showSelection && (
          <div className="flex gap-2">
            <Button
              className={`w-full bg-error text-white shadow-sm transition hover:shadow-sm hover:contrast-125`}
            >
              <h6>Remove Selected</h6>
            </Button>
            <Button
              className={`w-full bg-error text-white shadow-sm transition hover:shadow-sm hover:contrast-125`}
            >
              <h6>Remove All</h6>
            </Button>
          </div>
        )}
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
      <p className="min-w-[2rem] text-center">{quantity}</p>
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
