import { useEffect, useState } from "react"
import BurgerMenu from "./BurgerMenu"
import { motion } from "framer-motion"
import { Combobox } from "@headlessui/react"
import { useGetProductsQuery } from "../../features/api/apiSlice"
import { Link, useNavigate } from "react-router-dom"
import LocaleCurrency from "./../common/LocaleCurrency"
import { RiLoader5Line } from "react-icons/ri"
import { IoAlertCircleOutline } from "react-icons/io5"
import { MdErrorOutline } from "react-icons/md"

function debounce(callback, delay = 250) {
  let timeout

  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      callback(...args)
    }, delay)
  }
}

const SearchBar = ({
  name,
  id,
  containerClass,
  className,
  style,
  inputProps,
  ...rest
}) => {
  const [focus, setFocus] = useState(false)
  const [input, setInput] = useState("")
  const [query, setQuery] = useState("")

  const navigate = useNavigate()

  const {
    isFetching,
    isLoading,
    isError,
    isSuccess,
    data = {},
  } = useGetProductsQuery(
    { q: query, limit: 10 },
    {
      skip: !query,
    },
  )
  const { products = [] } = data

  function handleInput(e) {
    setInput(e.currentTarget.value)
  }

  function hardSearch() {
    if (!input) return
    navigate(`/shop/?q=${input}`)
  }

  function handleSearch(value) {
    if (value === "deepSearch") return hardSearch()
    navigate(`/product/${value}`)
  }

  const active = !focus ? false : input === "" ? false : true

  // Debounce
  useEffect(() => {
    const timerId = setTimeout(() => setQuery(input), 1000)
    return () => clearTimeout(timerId)
  }, [input])

  return (
    <>
      <div
        {...rest}
        className={`relative flex h-10 flex-wrap justify-between lg:h-12 ${
          className || ""
        }`}
      >
        <div className="flex w-10 items-center lg:hidden">
          {/* Burger menu */}
          <BurgerMenu />
        </div>
        <div
          className={`${
            focus
              ? "w-[calc(100%-theme(spacing.16))] -translate-x-10 lg:-translate-x-0"
              : "w-[calc(100%-theme(spacing.10))]"
          } absolute left-10 top-0 z-10 h-full  transition-all duration-300 lg:left-0 lg:w-full`}
        >
          <Combobox
            as="div"
            value={null}
            nullable={true}
            // For keyboard selection
            onChange={handleSearch}
            id="inputContainer"
            className={`${containerClass} relative flex h-full w-full flex-wrap gap-0 rounded-sm bg-white`}
          >
            <Combobox.Input
              {...inputProps}
              onChange={handleInput}
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
              value={input}
              placeholder="Search BestBuy"
              type="text"
              name={name}
              id={id}
              className={`${className} generic w-1 grow bg-transparent px-4 pe-0 text-body placeholder-gray-700 focus:ring-0 focus-visible:outline-none`}
              style={style}
            />

            <Combobox.Options
              className={`absolute top-full z-10 mt-1 max-h-96 w-full overflow-auto rounded-sm bg-white py-1 text-body shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm`}
            >
              <div className="flex flex-col justify-start gap-2 p-2">
                {input !== "" && (
                  <Combobox.Option key="deepSearch" value="deepSearch">
                    <p className="cursor-pointer rounded-sm px-2 py-2 text-center italic text-gray-700 transition-colors ui-active:bg-gray-200 ui-active:text-body">
                      Perform a deep search using &quot;{input}&quot;
                    </p>
                  </Combobox.Option>
                )}

                {(isFetching || isLoading) && (
                  <RiLoader5Line className="mx-auto animate-spin  text-2xl text-theme" />
                )}

                {isError && (
                  <h5 className="text-center text-red-500 ">
                    <MdErrorOutline className=" inline align-middle text-lg" />{" "}
                    <span className="align-middle">Network Error</span>
                  </h5>
                )}

                {!isFetching && !products.length && (
                  <h5 className="text-center text-gray-500">
                    No Products Found
                  </h5>
                )}

                {!isFetching &&
                  isSuccess &&
                  products.map((product) => (
                    <Combobox.Option
                      key={product.productKey}
                      value={product.productKey}
                    >
                      <div className="flex cursor-pointer gap-2 rounded-sm bg-gray-50 p-2  transition-colors ui-active:bg-gray-200">
                        <div className="aspect-video w-16">
                          <img
                            src={product.images?.at(-1)}
                            alt={product.title}
                            className="h-full w-full object-contain"
                          />
                        </div>
                        <div className="w-1 grow">
                          <h6>{product.title}</h6>
                          <LocaleCurrency>{product.price}</LocaleCurrency>
                        </div>
                      </div>
                    </Combobox.Option>
                  ))}
              </div>
            </Combobox.Options>

            <div
              className={`${
                active ? "visible z-0 -translate-x-2" : "invisible"
              } absolute right-8 top-1/2  -z-10 grid h-6 w-8 -translate-y-1/2 place-items-center border-e border-gray-500 transition-transform`}
            >
              <button
                onMouseDown={(e) => {
                  e.preventDefault()
                  setInput("")
                }}
                tabIndex={-1}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-5 w-5 fill-gray-500 text-white hover:fill-gray-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
            </div>

            <button
              className="grid w-10 appearance-none place-items-center stroke-2 text-theme hover:scale-105"
              // avoiding onClick as it will defocus/blur input element..
              // ..first causing the button to move before registering click
              onMouseDown={hardSearch}
              onPointerDown={hardSearch}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </button>
          </Combobox>
        </div>
        <button
          className="lg-hidden grid w-16 items-center justify-end"
          onClick={() => setFocus(false)}
        >
          <h6>Cancel</h6>
        </button>
      </div>
    </>
  )
}

export default SearchBar
