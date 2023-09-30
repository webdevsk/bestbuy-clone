import { Typography } from "@material-tailwind/react"
import { useState } from "react"
import BurgerMenu from "./BurgerMenu"

const SearchBar = ({
  name,
  id,
  containerClass,
  mainMenu,
  topMiniMenu,
  className,
  style,
  inputProps,
}) => {
  const [focus, setFocus] = useState(false)
  const [input, setInput] = useState("")

  const active = !focus ? false : input === "" ? false : true

  return (
    <>
      <div className="relative flex h-10 flex-wrap justify-between lg:h-12">
        <div className="flex w-10 items-center lg:hidden">
          {/* Burger menu */}
          <BurgerMenu mainMenu={mainMenu} topMiniMenu={topMiniMenu} />
        </div>
        <div
          className={`${
            focus
              ? "w-[calc(100%_-_4rem)] -translate-x-10 lg:-translate-x-0"
              : "w-[calc(100%_-_2.5rem)]"
          } absolute left-10 top-0 z-10 h-full  transition-all duration-300 lg:left-0 lg:w-full`}
        >
          <div
            id="inputContainer"
            className={`${containerClass} relative flex h-full w-full flex-wrap gap-0 rounded-sm bg-white`}
          >
            <input
              {...inputProps}
              onChange={(e) => setInput(e.currentTarget.value)}
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
              className="grid w-10 appearance-none place-items-center stroke-2 text-theme"
              onMouseDown={() => {
                console.log("Search")
              }}
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
          </div>
        </div>
        <button
          className="lg-hidden grid w-16 items-center justify-end"
          onClick={() => setFocus(false)}
        >
          <Typography variant="h6">Cancel</Typography>
        </button>
      </div>
    </>
  )
}

export default SearchBar
