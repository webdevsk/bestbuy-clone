import { Typography } from "@material-tailwind/react"
import { useDispatch, useSelector } from "react-redux"
import { IoIosAdd, IoIosClose, IoIosRemove } from "react-icons/io"
import { Link } from "react-router-dom"
import {
  decreaseCount,
  increaseCount,
  removeFromCart,
  selectAllCartItems,
} from "./cartItemsSlice"
import { memo, useCallback } from "react"
import { selectProductsEntities } from "../products/productsSlice"

const CartItems = (props) => {
  const { locale = "en-US", currency = "USD" } = props
  const cartItems = useSelector((state) => selectAllCartItems(state))
  const productsEntities = useSelector((state) => selectProductsEntities(state))
  const dispatch = useDispatch()

  const cartProducts = cartItems.map(({ id, count }) => ({
    ...productsEntities[id],
    count: count,
  }))

  const format = useCallback(
    (args) =>
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currency,
      }).format(args),
    [locale, currency],
  )

  return cartProducts.map((item) => (
    <div key={item.id} {...props} className={` ${props.className ?? ""}`}>
      <div className="flex flex-wrap gap-2">
        <Link to={`/product/${item.label}`} className="block w-20">
          <img
            className="aspect-video h-full w-full object-contain"
            src={item.images.at(-1)}
          />
        </Link>
        <div className="w-1 grow">
          <div className="flex w-full items-center">
            <Typography variant="h6" className="">
              {item.title}
            </Typography>

            <button
              className="ms-auto rounded-sm p-1 transition-colors hover:bg-gray-100"
              onClick={() => dispatch(removeFromCart(item.id))}
            >
              <IoIosClose className="scale-150" />
            </button>
          </div>
          <div className="flex items-center gap-1">
            <Typography variant="paragraph" className="min-w-[5rem]">
              {format(item.price)}
            </Typography>

            <div className="flex items-center">
              <button
                disabled={item.count === 1}
                onClick={() => dispatch(decreaseCount(item.id))}
                className="bg-gray-200 transition-colors hover:bg-gray-300 disabled:opacity-50"
              >
                <IoIosRemove className="text-xl" />
              </button>
              <Typography className="min-w-[2rem] text-center">
                {item.count}
              </Typography>
              <button
                disabled={item.count === 10}
                onClick={() => dispatch(increaseCount(item.id))}
                className="bg-gray-200 transition-colors hover:bg-gray-300 disabled:opacity-50"
              >
                <IoIosAdd className="text-xl" />
              </button>
            </div>

            <div className="ms-auto">
              <Typography variant="h4">
                {format(item.price * (item.count ?? 1))}
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  ))
}

export default memo(CartItems)
