import { Button, Typography } from "@material-tailwind/react"
import { Link } from "react-router-dom"
import SearchBar from "./SearchBar"
import { Fragment } from "react"
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
  return (
    <MainMenuContext.Provider value={mainMenu}>
      <HeaderMenuContext.Provider value={headerMenu}>
        <div id="header" className="relative z-50">
          <section className="mb-0 bg-theme py-4 text-white">
            <div className="container flex flex-wrap items-center gap-x-4 gap-y-4">
              <TopMiniMenuDesktop />

              <SiteLogo />
              <Desktop>
                <div className="w-full lg:w-96">
                  <SearchBar />
                </div>
              </Desktop>

              <HeaderToolBar />
            </div>
          </section>
          <a href="#pinned-product" className="skip">
            Skip to main content
          </a>
          <section className="mb-0 bg-[#003da6] py-2 text-white">
            <div className="container">
              <Mobile>
                <div className="w-full lg:w-96">
                  <SearchBar />
                </div>
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
    <div className="flex flex-wrap gap-4">
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
        <Typography variant="h6">Account</Typography>
      </Button>

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
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
          />
        </svg>

        <Typography variant="h6">Cart</Typography>
      </Button>
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
    <div className="hidden w-full flex-wrap justify-end gap-3 lg:flex">
      {headerMenu.map((menu) => (
        <Link key={menu.id} to={menu.link} className="hover:underline">
          <Typography variant="small">{menu.label}</Typography>
        </Link>
      ))}
    </div>
  )
}
