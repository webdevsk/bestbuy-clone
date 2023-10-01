// category
// brand
// price
// rating

import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Button,
  Radio,
  Typography,
} from "@material-tailwind/react"
import { useRef, useState } from "react"
import { Link } from "react-router-dom"
import RatingBar from "./RatingBar"
import createUnique from "../assets/createUnique"
import { MdKeyboardArrowDown } from "react-icons/md"

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

  //Disable Price filter button when no value is present
  const priceBtnRef = useRef(null)
  const minPriceRef = useRef(null)
  const maxPriceRef = useRef(null)

  const handlePriceBtn = () => {
    priceBtnRef.current.disabled =
      minPriceRef.current.value === "" && maxPriceRef.current.value === ""
  }

  return (
    <>
      <Accordion
        open={isOpen("category")}
        icon={
          <MdKeyboardArrowDown
            className={`${
              isOpen("category") && "rotate-180"
            } h-8 w-8 text-gray-800 transition`}
          />
        }
      >
        <AccordionHeader
          className="text-md group border-none text-body hover:text-theme"
          onClick={() => handleOpenObj("category")}
        >
          Category
        </AccordionHeader>
        <AccordionBody className="capitalize text-body">
          <ul className="flex flex-col gap-2">
            {createUnique(products, "category").map((category) => (
              <Link to={"/" + category} key={category}>
                <Typography className="hover:underline">{category}</Typography>
              </Link>
            ))}
          </ul>
        </AccordionBody>
      </Accordion>

      <Accordion
        open={isOpen("brands")}
        icon={
          <MdKeyboardArrowDown
            className={`${
              isOpen("brands") && "rotate-180"
            } h-8 w-8 text-gray-800 transition`}
          />
        }
      >
        <AccordionHeader
          className="text-md group border-none text-body hover:text-theme"
          onClick={() => handleOpenObj("brands")}
        >
          Brands
        </AccordionHeader>
        <AccordionBody className=" text-body">
          <ul className="flex flex-col gap-2">
            {createUnique(products, "brand").map((brand) => (
              <Link to={"/" + brand} key={brand}>
                <Typography className="hover:underline">{brand}</Typography>
              </Link>
            ))}
          </ul>
        </AccordionBody>
      </Accordion>

      <Accordion
        open={isOpen("price")}
        icon={
          <MdKeyboardArrowDown
            className={`${
              isOpen("price") && "rotate-180"
            } h-8 w-8 text-gray-800 transition`}
          />
        }
      >
        <AccordionHeader
          className="text-md group border-none text-body hover:text-theme"
          onClick={() => handleOpenObj("price")}
        >
          Price
        </AccordionHeader>
        <AccordionBody className="text-body">
          <div className="flex flex-wrap items-center gap-2 px-2">
            <div className="w-1 grow">
              <Typography>Min</Typography>
              <input
                type="text"
                placeholder="$"
                className=""
                ref={minPriceRef}
                onChange={handlePriceBtn}
                onKeyDown={(event) => {
                  !/[0-9]|Backspace/.test(event.key) && event.preventDefault()
                }}
              ></input>
            </div>

            <div className="pt-5">-</div>

            <div className="w-1 grow">
              <Typography>Max</Typography>
              <input
                type="text"
                placeholder="$"
                className=""
                ref={maxPriceRef}
                onChange={handlePriceBtn}
                onKeyDown={(event) =>
                  !/[0-9]|Backspace/.test(event.key) && event.preventDefault()
                }
              ></input>
            </div>

            <Button
              ref={priceBtnRef}
              size="lg"
              disabled
              className="mt-2 w-full bg-theme disabled:pointer-events-auto disabled:cursor-not-allowed disabled:bg-blue-gray-200 disabled:text-body disabled:opacity-100"
            >
              Apply Price Range
            </Button>
          </div>
        </AccordionBody>
      </Accordion>

      <Accordion
        open={isOpen("rating")}
        icon={
          <MdKeyboardArrowDown
            className={`${
              isOpen("rating") && "rotate-180"
            } h-8 w-8 text-gray-800 transition`}
          />
        }
      >
        <AccordionHeader
          className="text-md group border-none text-body hover:text-theme"
          onClick={() => handleOpenObj("rating")}
        >
          Customer Rating
        </AccordionHeader>
        <AccordionBody className="text-body">
          <ul className="flex flex-col gap-y-2 p-2 pr-0">
            <Radio
              id="showAll"
              name="rating"
              ripple={false}
              color="theme"
              className=""
              defaultChecked
              label="Show All"
              labelProps={{ className: "hover:underline" }}
            ></Radio>

            <Radio
              id="5stars"
              name="rating"
              ripple={false}
              color="theme"
              label={
                <div className="inline-flex items-center gap-1 hover:underline">
                  <RatingBar rating={5} />
                  <span>5 Stars</span>
                </div>
              }
            ></Radio>

            <Radio
              id="4stars"
              name="rating"
              ripple={false}
              color="theme"
              label={
                <div className="inline-flex items-center gap-1 hover:underline">
                  <RatingBar rating={4} />
                  <span>4 Stars & up</span>
                </div>
              }
            ></Radio>

            <Radio
              id="3stars"
              name="rating"
              ripple={false}
              color="theme"
              label={
                <div className="inline-flex items-center gap-1 hover:underline">
                  <RatingBar rating={3} />
                  <span>3 Stars & up</span>
                </div>
              }
            ></Radio>

            <Radio
              id="below-3-stars"
              name="rating"
              ripple={false}
              color="theme"
              label="3 Stars & below"
              labelProps={{ className: "hover:underline" }}
            ></Radio>
          </ul>
        </AccordionBody>
      </Accordion>
    </>
  )
}

export default Filters
