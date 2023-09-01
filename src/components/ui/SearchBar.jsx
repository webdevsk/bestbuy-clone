import { IconButton } from "@material-tailwind/react"

const SearchBar = ({
  name,
  id,
  containerClass = "w-96",
  className,
  style,
  inputProps,
}) => {
  return (
    <>
      <div className={`${containerClass} flex flex-wrap gap-0 bg-white`}>
        <input
          {...inputProps}
          type="text"
          name={name}
          id={id}
          className={`${className} generic w-1 grow bg-transparent p-4 text-body placeholder-gray-700 focus:ring-0 focus-visible:outline-none`}
          style={style}
        />

        <IconButton className="">
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
        </IconButton>
      </div>
    </>
  )
}

export default SearchBar
