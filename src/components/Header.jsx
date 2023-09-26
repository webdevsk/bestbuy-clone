import { Button, Typography } from "@material-tailwind/react"
import { Link } from "react-router-dom"
import SearchBar from "./SearchBar"
import { useEffect, useState } from "react"
import IconDownLine from "./ui/IconDownLine"
import FloatingDropDownMenu from "./ui/FloatingDropDownMenu"
import { Popover } from "@headlessui/react"
import createUnique from "../assets/createUnique"
import { response } from "../assets/disposable"
import { FloatHandler, FloatElement, FloatMenu } from "./ui/FloatMenu"

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
]

const topMiniMenu = [
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
  const [mobile, setMobile] = useState(false)
  useEffect(() => {
    function handleResize() {
      setMobile(window.outerWidth <= 960)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  })
  return (
    <div id="header" className="relative z-50">
      <section className="mb-0 bg-theme py-4 text-white">
        <div className="container flex flex-wrap items-center gap-x-4 gap-y-4">
          <div className="hidden w-full flex-wrap justify-end gap-3 lg:flex">
            {topMiniMenu.map((menu) => (
              <Link key={menu.id} to={menu.link} className="hover:underline">
                <Typography variant="small">{menu.label}</Typography>
              </Link>
            ))}
          </div>

          <div className="-mt-2">
            <Link to="/" className="flex items-end gap-1">
              <img src="src/assets/images/logo.png" alt="" width="48" />
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

          {!mobile && (
            <div className="w-full lg:w-96">
              <SearchBar />
            </div>
          )}

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
        </div>
      </section>
      <section className="mb-0 bg-[#003da6] pt-2 text-white">
        <div className="container">
          {mobile && (
            <div className="w-full lg:w-96">
              <SearchBar />
            </div>
          )}

          <ul className="flex flex-wrap gap-2 py-2">
            {mainMenu.map((menu) => (
              <FloatMenu key={menu.id} whenClicked autosize shift transition>
                <FloatHandler className="group flex gap-1 hover:text-accent focus-visible:outline-none">
                  <Typography variant="h6">{menu.label}</Typography>
                  <IconDownLine
                    // open={isOpen}
                    className="h-4 w-4"
                  ></IconDownLine>
                </FloatHandler>

                <FloatElement>
                  <div
                    className={`max-h-full w-80  overflow-y-scroll border border-t-transparent bg-white p-4 text-black`}
                  >
                    {menu.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </div>
                </FloatElement>
              </FloatMenu>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}

export default Header
