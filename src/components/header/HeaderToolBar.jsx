import { Button, Drawer, Typography } from "@material-tailwind/react"
import { useState } from "react"
import { FloatingOverlay, FloatingPortal } from "@floating-ui/react"
import Cart from "./Cart"
import BadgeCounter from "../common/BadgeCounter"
import { Account } from "./Account"
import { useGetCartItemsQuery } from "../../features/api/apiSlice"
import { useAuth0 } from "@auth0/auth0-react"

export const HeaderToolBar = () => {
  const { isAuthenticated, user } = useAuth0()
  const [isOpen, setIsOpen] = useState(false)
  const {
    isLoading,
    isFetching,
    data: cartData = { products: [], quantity: 0 },
  } = useGetCartItemsQuery(user?.email, {
    skip: !isAuthenticated || !user,
  })
  return (
    <>
      <div className="ms-auto">
        <div className="flex flex-wrap gap-4 group-[.floating]/header:gap-2 lg:group-[.floating]/header:gap-4">
          <Account />
          <Button
            variant="text"
            className="flex flex-wrap items-end gap-1 p-0 text-white hover:bg-transparent hover:text-accent focus-visible:outline-none active:bg-transparent"
            onClick={() => setIsOpen(true)}
          >
            <BadgeCounter
              className={isLoading || isFetching ? "animate-pulse" : ""}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-7 w-7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
              }
            >
              {cartData.quantity}
            </BadgeCounter>

            <Typography
              className="group-[.floating]/header:hidden lg:group-[.floating]/header:block"
              variant="h6"
            >
              Cart
            </Typography>
          </Button>
        </div>
      </div>
      <Drawer
        open={isOpen}
        onClose={() => setIsOpen(false)}
        placement="right"
        className="flex h-[100dvh] flex-col overflow-y-auto text-body"
        overlay={false}
        size={450}
      >
        {isOpen && (
          <Cart isOpen={isOpen} closeDrawer={() => setIsOpen(false)} />
        )}
      </Drawer>
      {isOpen && (
        <FloatingPortal>
          <FloatingOverlay
            // lockScroll
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-20 bg-black/30"
          ></FloatingOverlay>
        </FloatingPortal>
      )}
    </>
  )
}
