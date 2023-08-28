import { autoUpdate, flip, useFloating } from "@floating-ui/react-dom"
import { Listbox } from "@headlessui/react"
import { Typography } from "@material-tailwind/react"
import { useState } from "react"
import IconDownFilled from "./ui/IconDownFilled"

const sortOptions = [
  {
    label: "Best Match",
  },
  {
    label: "Price Low-High",
  },
  {
    label: "Price High-Low",
  },
  {
    label: "Highest Rated",
  },
]
const Sort = () => {
  const [selected, setSelected] = useState(sortOptions[0])
  const { refs, floatingStyles } = useFloating({
    whileElementsMounted: autoUpdate,
    placement: "bottom",
    middleware: [flip()],
  })

  return (
    <div className="">
      <Listbox value={selected} onChange={setSelected}>
        <Listbox.Button
          ref={refs.setReference}
          className="flex w-40 items-center justify-between rounded-sm border border-gray-500 bg-white px-4 py-3 text-left ring-4 ring-transparent ring-offset-2 ring-offset-transparent transition-shadow focus-visible:outline-none aria-expanded:ring-blue-100 aria-expanded:ring-offset-blue-900"
        >
          {({ open }) => (
            <>
              <Typography>{selected?.label}</Typography>

              <IconDownFilled open={open} />
            </>
          )}
        </Listbox.Button>

        <Listbox.Options
          ref={refs.setFloating}
          style={floatingStyles}
          className="z-10 w-40 divide-y-2 border-2 bg-white"
        >
          {sortOptions.map((option) => (
            <Listbox.Option
              className="cursor-pointer px-4 py-3 hover:bg-gray-100"
              key={option.label}
              value={option}
            >
              <Typography>{option.label}</Typography>
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  )
}

export default Sort
