import { Button, IconButton, Typography } from "@material-tailwind/react"
import { Link } from "react-router-dom"
import SearchBar from "./ui/SearchBar"

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
  return (
    <section className="mb-0 bg-theme py-4 text-white">
      <div className="container flex flex-wrap items-center gap-4">
        <div className="order-1 -mt-2">
          <Link to="/" className="flex items-end gap-1">
            <img src="src/assets/images/logo.png" alt="" width="32" />
            <Typography variant="h5" className=" leading-none">
              BestBuy
            </Typography>
          </Link>
        </div>

        <div className="order-2 ms-auto lg:order-3 ">
          <div className="flex flex-wrap justify-end gap-4">
            <div className="hidden w-full flex-wrap gap-3 xl:flex">
              {topMiniMenu.map((menu) => (
                <Link key={menu.key} to={menu.link} className="hover:underline">
                  <Typography variant="small">{menu.label}</Typography>
                </Link>
              ))}
            </div>
            <Button
              variant="text"
              size="xl"
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
              size="xl"
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

        <div className="order-3 w-full lg:order-2 lg:w-96">
          <SearchBar />
        </div>
      </div>
    </section>
  )
}

export default Header
