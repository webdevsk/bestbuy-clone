import { IconButton } from "@material-tailwind/react"
import { useState } from "react"

const SearchBar = ({
  name,
  id,
  containerClass,
  className,
  style,
  inputProps,
}) => {
  const [focus, setFocus] = useState(false)
  const [input, setInput] = useState("")

  const clearInput = () => setInput("")

  // const active = !focus ? false : input === "" ? false : true
  const active = input === "" ? false : true

  return (
    <>
      <div className="relative flex h-10 flex-wrap justify-between">
        <div className="grid w-20 place-items-center border lg:hidden">
          <button>Hello</button>
        </div>
        <div className="absolute left-20 top-0 z-10 h-full w-[calc(100%_-_5rem)] transition-transform duration-300 hover:-translate-x-20 lg:left-0 lg:w-full">
          <div
            className={`${containerClass} relative flex h-full w-full flex-wrap gap-0 bg-white`}
          >
            <input
              {...inputProps}
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
              onChange={(e) => setInput(e.currentTarget.value)}
              value={input}
              type="text"
              name={name}
              id={id}
              className={`${className} generic  w-1 grow bg-transparent px-4 pe-0 text-body placeholder-gray-700 focus:ring-0 focus-visible:outline-none `}
              style={style}
            />

            <div
              className={`${
                active ? "visible z-0 -translate-x-2" : "invisible"
              }  absolute right-8 top-1/2  -z-10 grid h-6 w-8 -translate-y-1/2 place-items-center border-e border-gray-500 transition-transform `}
            >
              <button onClick={clearInput}>
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

            <button className="grid w-10 appearance-none place-items-center stroke-2 text-theme focus-visible:outline-none">
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
          className="lg-hidden grid w-20 place-items-center border"
          onClick={clearInput}
        >
          Cancel
        </button>
      </div>
    </>
  )
}

export default SearchBar