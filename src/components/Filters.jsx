// category
// brand
// price
// rating

import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Radio,
  Typography,
} from "@material-tailwind/react"
import { useState } from "react"
import { Link } from "react-router-dom"
import RatingBar from "./RatingBar"

const Icon = ({ open }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={3}
      className={`${
        open ? "rotate-180" : ""
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
  const [openObj, setOpenObj] = useState({
    category: true,
    // brands: true,
    price: true,
    rating: true,
  })

  const isOpen = (key) => key in openObj && openObj[key]

  const handleOpenObj = (key) =>
    setOpenObj((openObj) => ({
      ...openObj,
      [key]: key in openObj ? !openObj[key] : true,
    }))

  return (
    <>
      <Accordion
        open={isOpen("category")}
        icon={<Icon open={isOpen("category")} />}
      >
        <AccordionHeader
          className="text-md group border-none text-body hover:text-theme"
          onClick={() => handleOpenObj("category")}
        >
          Category
        </AccordionHeader>
        <AccordionBody className="py-0 pb-4 capitalize text-body">
          <ul className="flex flex-col gap-2">
            {createUnique(products, "category").map((category) => (
              <Link to={"/" + category} key="product.id">
                <Typography className="hover:underline">{category}</Typography>
              </Link>
            ))}
          </ul>
        </AccordionBody>
      </Accordion>

      <Accordion
        open={isOpen("brands")}
        icon={<Icon open={isOpen("brands")} />}
      >
        <AccordionHeader
          className="text-md group border-none text-body hover:text-theme"
          onClick={() => handleOpenObj("brands")}
        >
          Brands
        </AccordionHeader>
        <AccordionBody className="text-body">
          <ul className="flex flex-col gap-2">
            {createUnique(products, "brand").map((brand) => (
              <Link to={"/" + brand} key="product.id">
                <Typography className="hover:underline">{brand}</Typography>
              </Link>
            ))}
          </ul>
        </AccordionBody>
      </Accordion>

      <Accordion open={isOpen("price")} icon={<Icon open={isOpen("price")} />}>
        <AccordionHeader
          className="text-md group border-none text-body hover:text-theme"
          onClick={() => handleOpenObj("price")}
        >
          Price
        </AccordionHeader>
        <AccordionBody className="py-0 pb-4 text-body">
          <div className="flex flex-col gap-2 pl-1 pr-4">
            <div className="flex items-center gap-2">
              <div className="w-1 grow">
                <Typography>Min</Typography>
                <input
                  type="text"
                  placeholder="$"
                  className="max-w-full rounded-sm border border-gray-600 p-4 ring-4 ring-transparent ring-offset-1 ring-offset-transparent transition-[box-shadow] placeholder:text-body focus-visible:border-blue-900 focus-visible:outline-none focus-visible:ring-blue-100 focus-visible:ring-offset-blue-900"
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
                  className="max-w-full rounded-sm border border-gray-600 p-4 ring-4 ring-transparent ring-offset-1 ring-offset-transparent transition-[box-shadow] placeholder:text-body focus-visible:border-blue-900 focus-visible:outline-none focus-visible:ring-blue-100 focus-visible:ring-offset-blue-900"
                  onKeyDown={(event) =>
                    !/[0-9]|Backspace/.test(event.key) && event.preventDefault()
                  }
                ></input>
              </div>
            </div>
          </div>
        </AccordionBody>
      </Accordion>

      <Accordion
        open={isOpen("rating")}
        icon={<Icon open={isOpen("rating")} />}
      >
        <AccordionHeader
          className="text-md group border-none text-body hover:text-theme"
          onClick={() => handleOpenObj("rating")}
        >
          Customer Rating
        </AccordionHeader>
        <AccordionBody className="text-body">
          <ul className="flex flex-col gap-y-2">
            <li>
              <Radio
                id="showAll"
                name="rating"
                ripple={false}
                color="theme"
                defaultChecked
                label="Show All"
              ></Radio>
            </li>

            <li>
              <Radio
                id="5stars"
                name="rating"
                ripple={false}
                color="theme"
                label={
                  <div className="inline-flex items-center gap-1">
                    <RatingBar rating={5} />
                    <span>5 Stars</span>
                  </div>
                }
              ></Radio>
            </li>

            <li>
              <Radio
                id="4stars"
                name="rating"
                ripple={false}
                color="theme"
                label={
                  <div className="inline-flex items-center gap-1">
                    <RatingBar rating={4} />
                    <span>4 Stars & up</span>
                  </div>
                }
              ></Radio>
            </li>

            <li>
              <Radio
                id="3stars"
                name="rating"
                ripple={false}
                color="theme"
                label={
                  <div className="inline-flex items-center gap-1">
                    <RatingBar rating={3} />
                    <span>3 Stars & up</span>
                  </div>
                }
              ></Radio>
            </li>

            <li>
              <Radio
                id="below-3-stars"
                name="rating"
                ripple={false}
                color="theme"
                label="3 Stars & below"
              ></Radio>
            </li>
          </ul>
        </AccordionBody>
      </Accordion>
    </>
  )
}

export default Filters
