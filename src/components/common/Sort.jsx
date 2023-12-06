import { Listbox } from "@headlessui/react"
import { Fragment } from "react"
import { Float } from "@headlessui-float/react"
import { GoTriangleDown } from "react-icons/go"
import { useSearchParams } from "react-router-dom"
import { sortOptions } from "../../assets/filtersDB"

const Sort = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const currentSortType = searchParams.get("sortby") ?? "best-match"

  const handleSort = (value) =>
    setSearchParams((params) => {
      if (value === "best-match") params.delete("sortby")
      if (value !== "best-match") params.set("sortby", value)
      return params
    })

  return (
    <Listbox value={currentSortType} onChange={handleSort}>
      <Float as="div" className="relative" flip floatingAs={Fragment}>
        <Listbox.Button className="flex w-44 items-center justify-between rounded-sm border border-gray-500 bg-white px-4 py-3 text-left ring-4 ring-transparent ring-offset-2 ring-offset-transparent transition-shadow aria-expanded:ring-blue-100 aria-expanded:ring-offset-blue-900">
          <p>
            {sortOptions?.find((option) => option.value === currentSortType)
              .label ?? currentSortType}
          </p>

          <GoTriangleDown className="h-5 w-5 transition ui-open:rotate-180" />
        </Listbox.Button>

        <Listbox.Options className="z-10 w-full divide-y-2 border-2 bg-white">
          {sortOptions?.map(({ label, value }) => (
            <Listbox.Option
              className="cursor-pointer px-4 py-3 hover:bg-gray-100"
              key={label}
              value={value}
            >
              <p>{label}</p>
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Float>
    </Listbox>
  )
}

export default Sort
