import { Button, Drawer, Typography } from "@material-tailwind/react"
import { useState } from "react"
import { FloatingOverlay, FloatingPortal } from "@floating-ui/react"
import Cart from "../../features/cart/Cart"
import BadgeCounter from "../common/BadgeCounter"
import { Popover } from "@headlessui/react"
import { HigherOrderFloat, HigherOrderPanel } from "../common/HigherOrderFloat"
import AccountPanel from "../../features/account/AccountPanel"
import { useAuth0 } from "@auth0/auth0-react"

export const HeaderToolBar = () => {
  const [isOpen, setIsOpen] = useState(false)

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
            <BadgeCounter icon>
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
        <Cart closeDrawer={() => setIsOpen(false)} />
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

const Account = () => {
  const { user, isAuthenticated, isLoading } = useAuth0()
  return (
    <Popover className="relative">
      <HigherOrderFloat offset={16} shift={{ crossAxis: true }}>
        <Popover.Button className="group flex flex-wrap items-end gap-2 p-0 text-white hover:bg-transparent hover:text-accent focus-visible:outline-none active:bg-transparent">
          {isLoading && (
            <>
              <div className="aspect-square h-7 w-7 animate-pulse rounded-full bg-gray-400"></div>
              <div className="grow animate-pulse rounded-sm bg-gray-400 leading-5 text-transparent">
                Account
              </div>
            </>
          )}
          {!isAuthenticated && !isLoading && (
            <>
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
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <Typography
                className="group-[.floating]/header:hidden lg:group-[.floating]/header:block"
                variant="h6"
              >
                Account
              </Typography>
            </>
          )}
          {isAuthenticated && user && (
            <>
              <img
                src={user.picture ?? "images/avatar-placeholder-human.svg"}
                className="aspect-square w-8 rounded-full border-2 border-white transition-shadow group-hover:border-accent"
              />
              <Typography
                variant="h6"
                className="max-w-[7rem] overflow-hidden text-ellipsis whitespace-nowrap group-[.floating]/header:hidden lg:group-[.floating]/header:block"
              >
                {user.name ?? user.nickname}
              </Typography>
            </>
          )}
        </Popover.Button>
        <HigherOrderPanel overlay={false}>
          <AccountPanel />
        </HigherOrderPanel>
      </HigherOrderFloat>
    </Popover>
  )
}
