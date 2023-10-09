import { useSelector } from "react-redux"
import { selectCartItemsTotal } from "../../features/cart/cartItemsSlice"

const BadgeCounter = ({ children, className, icon }) => {
  const cartCount = useSelector((state) => selectCartItemsTotal(state))
  return (
    <div className="relative">
      {children}
      <div
        className={`${
          icon ? "-translate-x-1/2 -translate-y-full" : "-translate-y-1/2"
        } badge absolute left-full top-1/2 min-h-[20px] min-w-[20px]  rounded-full bg-accent p-0.5 text-center font-serif text-xs font-bold text-body antialiased `}
      >
        {cartCount}
      </div>
    </div>
  )
}

export default BadgeCounter
