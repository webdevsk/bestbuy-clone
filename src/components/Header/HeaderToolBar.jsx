import { Button, Drawer, Typography } from "@material-tailwind/react"
import { Fragment, useState } from "react"
import { FloatingOverlay, FloatingPortal, size } from "@floating-ui/react"
import Cart from "../../features/cart/Cart"
import BadgeCounter from "../common/BadgeCounter"
import { Float } from "@headlessui-float/react"
import { Popover } from "@headlessui/react"
import { IoIosLogIn, IoIosLogOut } from "react-icons/io"
import { HigherOrderFloat, HigherOrderPanel } from "../common/HigherOrderFloat"

export const HeaderToolBar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className="ms-auto">
        <div className="flex flex-wrap gap-4 group-[.floating]/header:gap-2 lg:group-[.floating]/header:gap-4">
          <Popover className="relative">
            <HigherOrderFloat offset={16} shift={{ crossAxis: true }}>
              <Popover.Button className="flex flex-wrap items-end gap-1 p-0 text-white hover:bg-transparent hover:text-accent active:bg-transparent">
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
              </Popover.Button>
              <HigherOrderPanel overlay={false}>
                <AccountPanel />
              </HigherOrderPanel>
            </HigherOrderFloat>
          </Popover>

          <Button
            variant="text"
            className="flex flex-wrap items-end gap-1 p-0 text-white hover:bg-transparent hover:text-accent active:bg-transparent"
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

const AccountPanel = () => {
  return (
    <div
      className={`relative max-h-full w-64 max-w-full divide-y overflow-y-auto border border-t-transparent bg-white text-black shadow-md`}
    >
      {1 && (
        <button className="block w-full px-4 py-3 transition-colors hover:bg-gray-100">
          <Typography
            variant="paragraph"
            className="flex items-center gap-2 uppercase"
          >
            <IoIosLogIn className="text-xl" />
            Log in
          </Typography>
        </button>
      )}
      {1 && (
        <button className="block w-full px-4 py-3 transition-colors hover:bg-gray-100">
          <Typography
            variant="paragraph"
            className="flex items-center gap-2 uppercase"
          >
            <IoIosLogOut className="text-xl" />
            Log Out
          </Typography>
        </button>
      )}
    </div>
  )
}
