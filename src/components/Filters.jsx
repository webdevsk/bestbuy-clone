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

function Icon({ id, open }) {
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

const Filters = ({ products }) => {
  const [open, setOpen] = useState(1)
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
        <AccordionBody>
          <ul className="flex flex-col gap-2 antialiased">
            {products.map(({ category }) => (
              <Link to={"#"} key="product.name">
                <Typography className="capitalize text-black hover:underline">
                  {category}
                </Typography>
              </Link>
            ))}
          </ul>
        </AccordionBody>
      </Accordion>
    </>
  )
}

export default Filters
