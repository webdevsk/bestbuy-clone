// category
// brand
// price
// rating

import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Typography,
} from "@material-tailwind/react"
import { useState } from "react"
import { Link } from "react-router-dom"

const Icon = ({ id, open }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={3}
      className={`${
        id === open ? "rotate-180" : ""
      } mr-4 mt-1 h-5 w-5 stroke-gray-700 transition-transform group-hover:stroke-theme`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  )
}

const createUnique = (arr, key) => [
  ...new Map(arr.map((item) => [item[key], item])).keys(),
]

const Filters = ({ products }) => {
  const [open, setOpen] = useState(3)
  const handleOpen = (value) => setOpen(open === value ? 0 : value)

  return (
    <>
      <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
        <AccordionHeader
          className="text-md group border-none text-black hover:text-theme"
          onClick={() => handleOpen(1)}
        >
          Category
        </AccordionHeader>
        <AccordionBody className="py-0 pb-4 capitalize text-inherit">
          <ul className="flex flex-col gap-2">
            {createUnique(products, "category").map((category) => (
              <Link to={"/" + category} key="product.id">
                <Typography className="hover:underline">{category}</Typography>
              </Link>
            ))}
          </ul>
        </AccordionBody>
      </Accordion>

      <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
        <AccordionHeader
          className="text-md group border-none text-black hover:text-theme"
          onClick={() => handleOpen(2)}
        >
          Brands
        </AccordionHeader>
        <AccordionBody className="py-0 pb-4 capitalize text-inherit">
          <ul className="flex flex-col gap-2">
            {createUnique(products, "brand").map((brand) => (
              <Link to={"/" + brand} key="product.id">
                <Typography className="hover:underline">{brand}</Typography>
              </Link>
            ))}
          </ul>
        </AccordionBody>
      </Accordion>

      <Accordion open={open === 3} icon={<Icon id={3} open={open} />}>
        <AccordionHeader
          className="text-md group border-none text-black hover:text-theme"
          onClick={() => handleOpen(3)}
        >
          Price
        </AccordionHeader>
        <AccordionBody className="py-0 pb-4 text-inherit">
          <div className="flex flex-col gap-2 pl-1 pr-4">
            <div className="flex items-center gap-2">
              <div className="w-1 grow">
                <Typography>Min</Typography>
                <input
                  type="text"
                  placeholder="$"
                  className="max-w-full rounded-sm border border-gray-600 p-4 ring-4 ring-transparent ring-offset-1 ring-offset-transparent transition-[box-shadow] focus-visible:border-blue-900 focus-visible:outline-none focus-visible:ring-blue-100 focus-visible:ring-offset-blue-900"
                  onKeyDown={(event) =>
                    !/[0-9]|Backspace/.test(event.key) && event.preventDefault()
                  }
                ></input>
              </div>

              <div className="pt-5">-</div>

              <div className="w-1 grow">
                <Typography>Max</Typography>
                <input
                  type="text"
                  placeholder="$"
                  className="max-w-full rounded-sm border border-gray-600 p-4 ring-4 ring-transparent ring-offset-1 ring-offset-transparent transition-[box-shadow] focus-visible:border-blue-900 focus-visible:outline-none focus-visible:ring-blue-100 focus-visible:ring-offset-blue-900"
                  onKeyDown={(event) =>
                    !/[0-9]|Backspace/.test(event.key) && event.preventDefault()
                  }
                ></input>
              </div>
            </div>
          </div>
        </AccordionBody>
      </Accordion>
    </>
  )
}

export default Filters
