import { IoIosAdd, IoIosClose, IoIosRemove } from "react-icons/io"
import { Link } from "react-router-dom"
import { memo, useMemo, useState } from "react"
import BadgeCounter from "../common/BadgeCounter"
import {
  useDeleteCartItemsMutation,
  useGetCartItemsQuery,
  useUpdateCartItemMutation,
} from "../../features/api/apiSlice"
import { useAuth0 } from "@auth0/auth0-react"
import { IoCheckmarkCircleSharp, IoTrashSharp } from "react-icons/io5"
import { Switch } from "@headlessui/react"
import LocaleCurrency from "../common/LocaleCurrency"

const Cart = memo(({ isOpen, setIsOpen }) => {
  const [batchMode, setBatchMode] = useState(false)
  const [selected, setSelected] = useState([])
  const [deleteCartItems] = useDeleteCartItemsMutation()
  const { isAuthenticated, user } = useAuth0()
  const {
    isLoading,
    isError,
    isFetching,
    data: cartData = {
      products: [],
    },
  } = useGetCartItemsQuery(user?.email, {
    skip: !isAuthenticated || !user,
  })

  async function handleDelete({ currentTarget: t }) {
    setSelected([])
    setBatchMode(false)
    const productKeys = []
    if (t.name === "deleteOne" && !!t.value) productKeys.push(t.value)
    if (t.name === "deleteMany") productKeys.push(...selected)
    if (t.name !== "deleteAll" && !productKeys.length) return
    if (t.name === "deleteAll" && !cartData.products.length) return
    try {
      await deleteCartItems({
        email: user.email,
        productKeys,
        deleteAll: t.name === "deleteAll",
      }).unwrap()
    } catch (error) {
      console.error(error)
    }
  }

  // Calculating total price clientside
  const totalPrice = useMemo(() => {
    return cartData.products.reduce(
      (total, product) => total + product.price * product.quantity,
      0,
    )
  }, [cartData.products])

  function handleShow() {
    setBatchMode((state) => !state)
    // resetting the list
    setSelected((state) => (batchMode ? [] : state))
  }

  function handleSelection(checked, productKey) {
    checked
      ? setSelected((selected) => [...selected, productKey])
      : setSelected((selected) => selected.filter((key) => productKey !== key))
  }

  return (
    <>
      <div
        className={`sticky top-0 z-[1] flex items-center border-b p-4 pb-4 shadow transition-colors ${
          batchMode ? "bg-red-50" : "bg-white"
        }`}
      >
        <div className="flex items-center">
          <h3>{batchMode ? "Selected" : "Cart"}</h3>
          <BadgeCounter className={batchMode && "bg-error text-white"}>
            {batchMode ? selected.length : cartData.quantity ?? 0}
          </BadgeCounter>
        </div>

        <button
          className="me-4 ms-auto text-red-700 hover:underline"
          onClick={handleShow}
        >
          <small>{!batchMode ? "Batch Selection" : "Cancel"}</small>
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

      {isAuthenticated &&
        !isFetching &&
        !isError &&
        !cartData.products.length && (
          <div className="my-auto text-center">
            <p className="text-2xl font-bold text-gray-400">
              Cart is Empty ＞︿＜
            </p>
          </div>
        )}

      {!isAuthenticated && (
        <div className="my-auto text-center">
          <p className="text-2xl font-bold text-gray-400">
            Please login to view your Cart
          </p>
        </div>
      )}

      <div className="flex flex-col gap-2 p-4">
        {cartData.products?.map((item) => (
          <CartProduct
            key={item.id}
            isFetching={isFetching}
            item={item}
            batchMode={batchMode}
            selected={selected}
            setIsOpen={setIsOpen}
            handleDelete={handleDelete}
            handleSelection={handleSelection}
            user={user}
          />
        ))}
      </div>
      <div
        className={`sticky bottom-0 z-[1] mt-auto border-t p-4  shadow transition-colors ${
          batchMode ? "bg-red-50" : "bg-white"
        }`}
      >
        <div className="mb-2 flex items-center justify-between gap-2">
          <h4>Total</h4>
          <LocaleCurrency as="h3">{totalPrice ?? 0}</LocaleCurrency>
        </div>
        {!batchMode && (
          <button
            className={`w-full rounded-sm bg-accent p-3 text-body antialiased shadow-sm transition hover:shadow-sm hover:contrast-125`}
          >
            <h6>Checkout</h6>
          </button>
        )}

        {batchMode && (
          <div className="flex gap-2">
            <button
              title="Remove selected items from Cart"
              name="deleteMany"
              disabled={!selected.length}
              onClick={handleDelete}
              className={`w-full rounded-sm bg-error p-3 text-white antialiased shadow-sm transition hover:shadow-sm hover:contrast-125`}
            >
              <h6>Remove Selected</h6>
            </button>
            <button
              title="Remove all items from Cart"
              name="deleteAll"
              onClick={handleDelete}
              className={`w-full bg-error text-white shadow-sm transition hover:shadow-sm hover:contrast-125`}
            >
              <h6>Remove All</h6>
            </button>
          </div>
        )}
      </div>
    </>
  )
})

Cart.displayName = "Cart"
export default Cart

const CartProduct = memo(
  ({
    isFetching,
    item,
    batchMode,
    selected,
    setIsOpen,
    handleDelete,
    handleSelection,
    user,
  }) => {
    return (
      <div
        className={`rounded-md p-2 ${
          isFetching ? "animate-pulse opacity-70" : ""
        } ${
          batchMode && selected.includes(item.productKey)
            ? "bg-gray-300 shadow-inner [&_img]:blur-sm"
            : "bg-gray-50"
        }`}
      >
        <div className="flex flex-wrap gap-2">
          <Link
            to={`/product/${item.productKey}`}
            className="block w-20"
            onClick={() => setIsOpen(false)}
          >
            <img
              className="aspect-video h-full w-full object-contain"
              src={item.images?.at(-1)}
            />
          </Link>
          <div className="flex w-1 grow flex-col gap-2">
            <div className="flex w-full items-start">
              <h6 className="leading-snug">{item.title}</h6>
              {!batchMode && (
                <button
                  className="ms-auto"
                  name="deleteOne"
                  title="Remove item from Cart"
                  onClick={handleDelete}
                  value={item.productKey}
                >
                  <IoTrashSharp
                    className={`rounded-full bg-white text-lg text-error`}
                  />
                </button>
              )}
              {batchMode && (
                <Switch
                  title={
                    selected.includes(item.productKey)
                      ? "Unmark item"
                      : "Mark item"
                  }
                  checked={selected.includes(item.productKey)}
                  onChange={(checked) =>
                    handleSelection(checked, item.productKey)
                  }
                  name={"Mark Item for deletion"}
                  className={`ms-auto`}
                >
                  <span className="sr-only">Mark item</span>
                  <IoCheckmarkCircleSharp
                    className={`clip-rounded rounded-full bg-white text-lg ring-2 ${
                      selected.includes(item.productKey)
                        ? "text-error ring-error"
                        : "text-transparent ring-gray-400 hover:ring-error"
                    }`}
                  />
                </Switch>
              )}
            </div>
            <div className="flex items-center justify-between gap-1">
              <LocaleCurrency as="p">{item.price}</LocaleCurrency>

              <div className="flex items-center">
                <CartItemMutator
                  quantity={item.quantity}
                  email={user.email}
                  productKey={item.productKey}
                />
              </div>

              <div className="">
                <LocaleCurrency
                  as="h4"
                  className={
                    selected.includes(item.productKey) ? "line-through" : ""
                  }
                >
                  {item.price * (item.quantity ?? 1)}
                </LocaleCurrency>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },
)

CartProduct.displayName = "CartProduct"

const CartItemMutator = ({ email, productKey, quantity }) => {
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
        productKey,
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
        className="bg-gray-200 transition-colors hover:bg-gray-300 disabled:opacity-30"
        onClick={handleQuantity}
      >
        <IoIosRemove className="text-xl" />
      </button>
      <p className="min-w-[2rem] text-center">{quantity}</p>
      <button
        disabled={quantity === 10}
        name="increment"
        className="bg-gray-200 transition-colors hover:bg-gray-300 disabled:opacity-30"
        onClick={handleQuantity}
      >
        <IoIosAdd className="text-xl" />
      </button>
    </>
  )
}
