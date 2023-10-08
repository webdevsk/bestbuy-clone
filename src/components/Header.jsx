import { Badge, Button, Drawer, Typography } from "@material-tailwind/react"
import { Link } from "react-router-dom"
import SearchBar from "./SearchBar"
import { Fragment, memo, useEffect, useRef, useState } from "react"
import createUnique from "../hooks/createUnique"
import { response } from "../assets/disposable"
import { FloatingOverlay, FloatingPortal, size } from "@floating-ui/react"
import { Popover } from "@headlessui/react"
import { Float } from "@headlessui-float/react"
import { HiChevronDown } from "react-icons/hi"
import MainMenuContext, {
  useMainMenuContext,
} from "../contexts/MainMenuContext"
import HeaderMenuContext, {
  useHeaderMenuContext,
} from "../contexts/HeaderMenuContext"
import { Desktop, Mobile } from "./ui/ReactResponsive"
import { IoIosClose } from "react-icons/io"
import CartItems from "../features/cartItems/CartItems"
import ProductsContext from "../contexts/ProductsContext"
import { useSelector } from "react-redux"
import { selectCartItemsTotal } from "../features/cartItems/cartItemsSlice"

const { products } = response

const mainMenu = [
  {
    id: 1,
    label: "Shop",
    items: ["Dress", "Phones"],
  },
  {
    id: 2,
    label: "Brands",
    items: createUnique(response.products, "brand"),
  },
  {
    id: 3,
    label: "Categories",
    items: createUnique(response.products, "category"),
  },
]

const headerMenu = [
  {
    id: 1,
    label: "Order Status",
    link: "#",
  },
  {
    id: 2,
    label: "Blog",
    link: "#",
  },
  {
    id: 3,
    label: "Best Buy Business",
    link: "#",
  },
]

const Header = () => {
  const headerRef = useRef(null)
  const stickyHeaderRef = useRef(null)
  const [isSticking, setIsSticking] = useState(false)
  useEffect(() => {
    // Amount of pixels after the floating should start
    const distance = headerRef.current.getBoundingClientRect().height

    const handleScroll = () => {
      const height = stickyHeaderRef.current.getBoundingClientRect().height
      //if header is visible
      const isFloating = distance < scrollY

      //Calculation:
      // Initially hide itself completely. As in translateY: -100% or bottom: 100%
      // (scrollY - distance) The amount scrolled minus the main header height. So initially it is 0 after scrolling past header container
      // Keep increasing translateY as the scrollY-distance value increases. Stops at translateY: 0%. Now the sticky header is completely visible
      const offset = -height + (scrollY - distance)

      setIsSticking(isFloating)
      headerRef.current.classList.toggle("floating", isFloating)
      stickyHeaderRef.current.style.position = isFloating ? "fixed" : "absolute"
      stickyHeaderRef.current.style.top = `${
        isFloating && offset < 0 ? offset : 0
      }px`
    }

    addEventListener("scroll", handleScroll)
    return () => removeEventListener("scroll", handleScroll)
  }, [stickyHeaderRef, headerRef])

  return (
    <MainMenuContext.Provider value={mainMenu}>
      <HeaderMenuContext.Provider value={headerMenu}>
        <div id="header" ref={headerRef} className="group/header relative z-50">
          <section className="mb-0 bg-theme text-white lg:pb-2 lg:pt-4">
            <div className="flex flex-col">
              <TopMiniMenuDesktop />
              {/* placeholder */}
              <div className="relative h-16">
                <div
                  ref={stickyHeaderRef}
                  className={`absolute inset-x-0 grid h-16 place-items-center ${
                    isSticking ? "bg-theme shadow-lg shadow-black/30" : ""
                  }`}
                >
                  <div className="container flex flex-wrap items-center gap-x-4">
                    <Desktop>
                      <SiteLogo />
                    </Desktop>
                    <Mobile>
                      {!isSticking && <SiteLogo />}
                      {isSticking && (
                        <div className="w-1 grow">
                          <SearchBar />
                        </div>
                      )}
                    </Mobile>
                    <Desktop>
                      <div className="w-full lg:w-96">
                        <SearchBar />
                      </div>
                    </Desktop>

                    <HeaderToolBar />
                  </div>
                </div>
              </div>
            </div>
          </section>
          <a href="#pinned-product" className="skip">
            Skip to main content
          </a>
          <section className="mb-0 bg-[#003da6] py-2 text-white">
            <div className="container">
              <Mobile>
                {!isSticking ? (
                  <div className="w-full lg:w-96">
                    <SearchBar />
                  </div>
                ) : (
                  <div className="h-10"></div>
                )}
              </Mobile>
              <Desktop>
                <MainMenuDesktop />
              </Desktop>
            </div>
          </section>
        </div>
      </HeaderMenuContext.Provider>
    </MainMenuContext.Provider>
  )
}

export default Header

const SiteLogo = () => (
  <div className="-mt-2">
    <Link to="/" className="flex items-end gap-1">
      <img src="/images/logo.png" alt="" width="48" />
      <div className="-mb-1">
        <Typography
          variant="h3"
          className="font-serif leading-none lg:leading-none"
        >
          Best
        </Typography>
        <Typography
          variant="h3"
          className="font-serif leading-none lg:leading-none"
        >
          Buy
        </Typography>
      </div>
    </Link>
  </div>
)

const HeaderToolBar = () => (
  <div className="ms-auto">
    <div className="flex flex-wrap gap-4 group-[.floating]/header:gap-2 xl:group-[.floating]/header:gap-4">
      <Button
        variant="text"
        className="flex flex-wrap items-end gap-1 p-0 text-white hover:bg-transparent hover:text-accent active:bg-transparent"
      >
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
          className="group-[.floating]/header:hidden xl:group-[.floating]/header:block"
          variant="h6"
        >
          Account
        </Typography>
      </Button>
      <Cart />
    </div>
  </div>
)

const MainMenuDesktop = () => {
  const mainMenu = useMainMenuContext()
  return (
    <Popover.Group as="ul" className="flex flex-wrap gap-2 py-2">
      {mainMenu.map((menu) => (
        <Popover className="relative" key={menu.id}>
          <Float
            offset={16}
            arrow={0}
            shift
            placement="bottom-start"
            transform={false}
            floatingAs={Fragment}
            middleware={[
              size({
                apply({ availableHeight, elements }) {
                  Object.assign(elements.floating.style, {
                    height: `${availableHeight}px`,
                  })
                },
              }),
            ]}
            enter="transition duration-200 ease-out"
            enterFrom="opacity-0 scale-y-90"
            enterTo="scale-y-100 opacity-100"
            leave="transition duration-200 ease-in"
            leaveFrom="scale-y-100 opacity-100"
            leaveTo="scale-y-90 opacity-0"
            originClass="origin-top"
          >
            <Popover.Button className="group flex items-center gap-1 hover:text-accent focus-visible:outline-none">
              <Typography variant="h6" className="capitalize">
                {menu.label}
              </Typography>
              <HiChevronDown
                className={`h-5 w-5 transition ui-open:rotate-180`}
              />
            </Popover.Button>

            <Popover.Panel className="pointer-events-none [&>*]:pointer-events-auto">
              <Float.Arrow className="absolute h-5 w-5 rotate-45 border border-gray-200 bg-white" />
              <div
                className={`relative max-h-full w-80 overflow-y-scroll border border-t-transparent bg-white py-2 text-black`}
              >
                {menu.items.map((item) => (
                  <li key={item}>
                    <Link
                      to={item}
                      className="block px-3 py-1 transition-colors hover:bg-gray-100 hover:text-theme"
                    >
                      <Typography className="text-base capitalize">
                        {item}
                      </Typography>
                    </Link>
                  </li>
                ))}
              </div>

              <FloatingPortal>
                <FloatingOverlay
                  lockScroll
                  className="pointer-events-none z-30 h-screen w-full bg-black/30"
                />
              </FloatingPortal>
            </Popover.Panel>
          </Float>
        </Popover>
      ))}
    </Popover.Group>
  )
}

const TopMiniMenuDesktop = () => {
  const headerMenu = useHeaderMenuContext()
  return (
    <div className="container hidden flex-wrap justify-end gap-3 lg:flex">
      {headerMenu.map((menu) => (
        <Link key={menu.id} to={menu.link} className="hover:underline">
          <Typography variant="small">{menu.label}</Typography>
        </Link>
      ))}
    </div>
  )
}

const Cart = memo(() => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button
        variant="text"
        className="flex flex-wrap items-end gap-1 p-0 text-white hover:bg-transparent hover:text-accent active:bg-transparent"
        onClick={() => setIsOpen(true)}
      >
        <BadgeCounter>
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
          className="group-[.floating]/header:hidden xl:group-[.floating]/header:block"
          variant="h6"
        >
          Cart
        </Typography>
      </Button>
      <Drawer
        open={isOpen}
        onClose={() => setIsOpen(false)}
        placement="right"
        className="flex h-[100dvh] flex-col overflow-y-auto text-body"
        overlay={false}
        size={450}
      >
        <div className="sticky top-0 z-[1] flex items-center justify-between rounded-t-xl bg-white p-4 pb-4">
          <Typography variant="h2">Cart</Typography>
          <button
            onClick={() => setIsOpen(false)}
            className="rounded-sm hover:bg-gray-100"
          >
            <IoIosClose className="h-6 w-6" />
          </button>
        </div>
        <div className="flex flex-col gap-2 p-4">
          <ProductsContext.Provider value={products}>
            <CartItems className="rounded-md bg-gray-50 p-2" />
          </ProductsContext.Provider>
        </div>
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
})
Cart.displayName = "Cart"

const BadgeCounter = ({ children }) => {
  const cartCount = useSelector((state) => selectCartItemsTotal(state))
  return (
    <div className="relative">
      {children}
      <div className="badge absolute right-0 top-0 min-h-[20px] min-w-[20px] -translate-y-1/3 translate-x-1/3 rounded-full bg-accent p-0.5 font-serif text-xs font-bold text-body antialiased">
        {cartCount}
      </div>
    </div>
  )
}
