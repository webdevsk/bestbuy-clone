import { Button } from "@material-tailwind/react"
import { useState } from "react"
import Cart from "./Cart"
import BadgeCounter from "../common/BadgeCounter"
import { Account } from "./Account"
import { useGetCartItemsQuery } from "../../features/api/apiSlice"
import { useAuth0 } from "@auth0/auth0-react"
import { AnimatePresence, motion } from "framer-motion"
import { Dialog } from "@headlessui/react"
import { useStickyHeaderContext } from "../../hooks/useStickyHeaderContext"

const backdropVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0, transition: { delay: 0.3 } },
}
const drawerVariants = {
  visible: {
    transform: "translate(0%)",
    transition: { delay: 0.3, duration: 0.3, ease: "easeOut" },
  },
  hidden: {
    transform: "translate(100%)",
    transition: { duration: 0.2, ease: "easeIn" },
  },
}

export const HeaderToolBar = () => {
  const isSticking = useStickyHeaderContext()
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
        <div
          className={`flex flex-wrap gap-4 ${
            isSticking ? "gap-2 lg:gap-4" : ""
          }`}
        >
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

            <h6 className={isSticking ? "hidden lg:block" : ""}>Cart</h6>
          </Button>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <Dialog
            static
            as={motion.div}
            open={isOpen}
            onClose={() => setIsOpen(false)}
          >
            <Dialog.Backdrop
              as={motion.div}
              aria-hidden="true"
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-black/30"
            />

            <Dialog.Panel
              as={motion.div}
              variants={drawerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="fixed right-0 top-0 z-[9999] flex h-screen w-[28rem] max-w-[100dvw] flex-col overflow-y-auto bg-white text-body"
            >
              <Cart isOpen={isOpen} closeDrawer={() => setIsOpen(false)} />
            </Dialog.Panel>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  )
}
