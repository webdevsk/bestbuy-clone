import { Listbox } from "@headlessui/react"
import { Typography } from "@material-tailwind/react"
import { Fragment, useState } from "react"
import { Float } from "@headlessui-float/react"
import { GoTriangleDown } from "react-icons/go"

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

  return (
    <Listbox value={selected} onChange={setSelected}>
      <Float as="div" className="relative" flip floatingAs={Fragment}>
        <Listbox.Button className="flex w-40 items-center justify-between rounded-sm border border-gray-500 bg-white px-4 py-3 text-left ring-4 ring-transparent ring-offset-2 ring-offset-transparent transition-shadow aria-expanded:ring-blue-100 aria-expanded:ring-offset-blue-900">
          <Typography>{selected?.label}</Typography>

          <GoTriangleDown className="h-5 w-5 transition ui-open:rotate-180" />
        </Listbox.Button>

        <Listbox.Options className="z-10 w-full divide-y-2 border-2 bg-white">
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
      </Float>
    </Listbox>
  )
}

export default Sort
