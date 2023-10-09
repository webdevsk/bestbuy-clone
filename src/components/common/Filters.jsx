import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Button,
  Radio,
  Typography,
} from "@material-tailwind/react"
import { useRef } from "react"
import { Link } from "react-router-dom"
import RatingBar from "./RatingBar"
import { MdKeyboardArrowDown } from "react-icons/md"
import useLocalStorage from "../../hooks/useLocalStorage"
import { useSelector } from "react-redux"
import {
  selectProductBrands,
  selectProductCategories,
} from "../../features/products/productsSlice"

const Filters = () => {
  const [openObj, setOpenObj] = useLocalStorage("openFilters", {
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

  const categories = useSelector((state) => selectProductCategories(state))
  const brands = useSelector((state) => selectProductBrands(state))

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
            {categories.map((category, i) => (
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
            {brands.map((brand, i) => (
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
          <div className="flex flex-wrap items-center gap-2 px-2">
            <div className="w-1 grow">
              <Typography>Min</Typography>
              <input
                type="text"
                placeholder="$"
                className="w-full"
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
                className="w-full"
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
              className="mt-2 w-full bg-theme px-2 text-center disabled:pointer-events-auto disabled:cursor-not-allowed disabled:bg-blue-gray-200 disabled:text-body disabled:opacity-100"
            >
              <Typography variant="h6">Apply Price Range</Typography>
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
}

export default Filters
