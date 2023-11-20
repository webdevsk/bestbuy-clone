import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Button,
  Radio,
  Typography,
} from "@material-tailwind/react"
import { memo, useState } from "react"
import { Link } from "react-router-dom"
import RatingBar from "./RatingBar"
import { MdKeyboardArrowDown } from "react-icons/md"
import useLocalStorage from "../../hooks/useLocalStorage"
import { useSelector } from "react-redux"
import {
  selectProductBrands,
  selectProductCategories,
} from "../../features/api/apiSlice"

const Filters = memo(() => {
  const [openObj, setOpenObj] = useLocalStorage("openFilters", {
    category: true,
    // brands: true,
    price: true,
    rating: true,
  })

  const categories = useSelector((state) => selectProductCategories(state))
  const brands = useSelector((state) => selectProductBrands(state))
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
        icon={
          <MdKeyboardArrowDown
            className={`${
              isOpen("category") && "rotate-180"
            } h-5 w-5 text-gray-800 transition xl:h-8 xl:w-8`}
          />
        }
      >
        <AccordionHeader
          className="group border-none text-body hover:text-theme"
          onClick={() => handleOpenObj("category")}
        >
          <Typography variant="h6">Category</Typography>
        </AccordionHeader>
        <AccordionBody className="capitalize text-body">
          <ul className="flex flex-col gap-2">
            {categories?.map((category, i) => (
              <Link to={"/" + category} key={i}>
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
            } h-5 w-5 text-gray-800 transition xl:h-8 xl:w-8`}
          />
        }
      >
        <AccordionHeader
          className="group border-none text-body hover:text-theme"
          onClick={() => handleOpenObj("brands")}
        >
          <Typography variant="h6">Brands</Typography>
        </AccordionHeader>
        <AccordionBody className=" text-body">
          <ul className="flex flex-col gap-2">
            {brands?.map((brand, i) => (
              <Link to={"/" + brand} key={i}>
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
            } h-5 w-5 text-gray-800 transition xl:h-8 xl:w-8`}
          />
        }
      >
        <AccordionHeader
          className="group border-none text-body hover:text-theme"
          onClick={() => handleOpenObj("price")}
        >
          <Typography variant="h6">Price</Typography>
        </AccordionHeader>
        <AccordionBody className="text-body">
          <PriceModule />
        </AccordionBody>
      </Accordion>

      <Accordion
        open={isOpen("rating")}
        icon={
          <MdKeyboardArrowDown
            className={`${
              isOpen("rating") && "rotate-180"
            } h-5 w-5 text-gray-800 transition xl:h-8 xl:w-8`}
          />
        }
      >
        <AccordionHeader
          className="group border-none text-body hover:text-theme"
          onClick={() => handleOpenObj("rating")}
        >
          <Typography variant="h6">Customer Rating</Typography>
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
})

Filters.displayName = "Filters"
export default Filters

const PriceModule = () => {
  const [input, setInput] = useState({
    min: "",
    max: "",
  })

  //input object values must be converted to Number inside dispatch actions in REDUX

  const handleInput = ({ currentTarget: t }) => {
    // In case DOM is altered
    if (!(t.name in input)) return

    // In case anything other than (number or nothing) is given. Only 0 to 7 digits are allowed
    if (!/^(\d{0,7})$/.test(t.value)) return

    setInput((input) => ({
      ...input,
      [t.name]: t.value,
    }))
  }

  // Disable Apply button if both values are empty or when min value is equal or greater than max value
  const isDisabled =
    (input.min === "" && input.max === "") ||
    parseInt(input.min) >= parseInt(input.max)

  return (
    <div className="flex flex-wrap items-center gap-2 px-2">
      <div className="w-1 grow">
        <Typography>Min</Typography>
        <input
          type="text"
          placeholder="$"
          className="w-full"
          name="min"
          value={input.min}
          onChange={handleInput}
        ></input>
      </div>

      <div className="pt-5">-</div>

      <div className="w-1 grow">
        <Typography>Max</Typography>
        <input
          type="text"
          placeholder="$"
          name="max"
          className="w-full"
          value={input.max}
          onChange={handleInput}
        ></input>
      </div>

      <Button
        size="lg"
        disabled={isDisabled}
        className="mt-2 w-full bg-theme px-2 text-center disabled:pointer-events-auto disabled:cursor-not-allowed disabled:bg-blue-gray-200 disabled:text-body disabled:opacity-100"
      >
        <Typography variant="h6">Apply Price Range</Typography>
      </Button>
    </div>
  )
}
