import { memo, useState } from "react"
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from "react-icons/md"
import { useSearchParams } from "react-router-dom"
import RatingBar from "./RatingBar"
import { MdKeyboardArrowDown } from "react-icons/md"
import useLocalStorage from "../../hooks/useLocalStorage"
import { useSelector } from "react-redux"
import {
  selectProductBrands,
  selectProductCategories,
} from "../../features/api/apiSlice"
import { Disclosure, RadioGroup } from "@headlessui/react"
import { ratingFilters } from "../../assets/filtersDB"
import FilterBubble from "./FilterBubble"
import { AnimatePresence, motion } from "framer-motion"

const Filters = memo(() => {
  const [searchParams, setSearchParams] = useSearchParams()
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
      <HiOrderAccordion
        value="category"
        isOpen={isOpen}
        handleOpenObj={handleOpenObj}
      >
        <ul className="flex flex-col items-start gap-1">
          {categories?.map((category, i) => (
            <button
              type="button"
              label={category}
              aria-current={
                searchParams.has("category") &&
                searchParams.get("category") === category
              }
              className="group text-start"
              onClick={() =>
                setSearchParams((params) => {
                  params.set("category", category)
                  return params
                })
              }
              key={i}
            >
              <p className="capitalize hover:underline group-aria-[current=true]:font-semibold">
                {category.replace("-", " ")}
              </p>
            </button>
          ))}
        </ul>
      </HiOrderAccordion>

      <HiOrderAccordion
        value="brand"
        isOpen={isOpen}
        handleOpenObj={handleOpenObj}
      >
        <ul className="flex flex-col items-start gap-1">
          {brands?.map((brand, i) => (
            <button
              type="button"
              label={brand}
              aria-current={
                searchParams.has("brand") && searchParams.get("brand") === brand
              }
              className="group text-start"
              key={i}
              onClick={() =>
                setSearchParams((params) => {
                  params.set("brand", brand)
                  return params
                })
              }
            >
              <p className="hover:underline">{brand}</p>
            </button>
          ))}
        </ul>
      </HiOrderAccordion>

      <HiOrderAccordion
        value="price"
        isOpen={isOpen}
        handleOpenObj={handleOpenObj}
      >
        <PriceModule />
      </HiOrderAccordion>

      <HiOrderAccordion
        value="rating"
        isOpen={isOpen}
        handleOpenObj={handleOpenObj}
      >
        <RatingModule />
      </HiOrderAccordion>
    </>
  )
})

Filters.displayName = "Filters"
export default Filters

const HiOrderAccordion = ({
  children,
  label,
  value,
  isOpen,
  handleOpenObj,
  ...rest
}) => (
  <Disclosure>
    <Disclosure.Button
      className="group flex w-full items-center justify-between p-2 text-body hover:text-theme"
      onClick={() => handleOpenObj(value)}
    >
      <h5 className={label ? "" : "capitalize"}>{label ?? value}</h5>
      <MdKeyboardArrowDown
        className={`${
          isOpen(value) ? "rotate-180" : ""
        } h-5 w-5 transition xl:h-8 xl:w-8`}
      />
    </Disclosure.Button>
    <AnimatePresence>
      {isOpen(value) && (
        <Disclosure.Panel
          as={motion.div}
          static
          variants={{}}
          initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
          animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
          exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
          transition={{ type: "tween" }}
          style={{ originY: 0 }}
          open={isOpen(value)}
          {...rest}
          className="py-2 ps-2 text-body"
        >
          <FilterBubble className="mb-3 w-max" noLabel label={value} />
          {children}
        </Disclosure.Panel>
      )}
    </AnimatePresence>
  </Disclosure>
)

const PriceModule = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [defaultMin, defaultMax] = searchParams.has("price")
    ? searchParams
        .get("price")
        .split("to")
        .map((value) => (isNaN(parseFloat(value)) ? "" : parseFloat(value)))
    : ["", ""]

  const [input, setInput] = useState({
    min: defaultMin,
    max: defaultMax,
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
    parseFloat(input.min) >= parseFloat(input.max)

  function handlePriceFilter() {
    setSearchParams((params) => {
      params.set("price", input.min + "to" + input.max)
      return params
    })
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="w-1 grow">
        <p>Min</p>
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
        <p>Max</p>
        <input
          type="text"
          placeholder="$"
          name="max"
          className="w-full"
          value={input.max}
          onChange={handleInput}
        ></input>
      </div>

      <button
        disabled={isDisabled}
        onClick={handlePriceFilter}
        className="mt-2 w-full rounded-sm bg-theme px-2 py-4 text-center text-white antialiased transition hover:shadow-md hover:contrast-125 disabled:pointer-events-auto disabled:cursor-not-allowed disabled:bg-blue-gray-200 disabled:text-body disabled:opacity-100"
      >
        <h6>Apply Price Range</h6>
      </button>
    </div>
  )
}

const RatingModule = (props) => {
  const { className, ...rest } = props
  // const [rating, setRating] = useState(ratingFilters[0].value)
  const [searchParams, setSearchParams] = useSearchParams()

  function handleChange(value) {
    setSearchParams((params) => {
      if (value === "undefined") {
        params.delete("rating")
      } else {
        params.set("rating", value)
      }
      return params
    })
  }

  const radioClasses = (checked) =>
    `${
      checked
        ? "opacity-100 drop-shadow-xl"
        : "opacity-30 group-hover:opacity-50"
    } text-2xl text-theme`

  return (
    <RadioGroup
      name="rated"
      value={
        searchParams.has("rating") ? searchParams.get("rating") : "undefined"
      }
      onChange={handleChange}
      className={`flex flex-col gap-2 ${className ?? ""}`}
      {...rest}
    >
      <RadioGroup.Label className="hidden">Customer Rating</RadioGroup.Label>
      {ratingFilters?.map((option) => (
        <RadioGroup.Option
          key={option.id}
          value={option.value}
          className={`group
        inline-flex w-max cursor-pointer items-center gap-1 leading-none`}
        >
          {({ checked }) => (
            <>
              {checked ? (
                <MdRadioButtonChecked className={radioClasses(checked)} />
              ) : (
                <MdRadioButtonUnchecked className={radioClasses(checked)} />
              )}
              {!!option.stars && <RatingBar rating={option.stars} />}
              <small className="text-sm font-normal group-hover:underline">
                {option.label}
              </small>
            </>
          )}
        </RadioGroup.Option>
      ))}
    </RadioGroup>
  )
}
