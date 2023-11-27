import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Button,
} from "@material-tailwind/react"
import { memo, useState } from "react"
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from "react-icons/md"
import { Link } from "react-router-dom"
import RatingBar from "./RatingBar"
import { MdKeyboardArrowDown } from "react-icons/md"
import useLocalStorage from "../../hooks/useLocalStorage"
import { useSelector } from "react-redux"
import {
  selectProductBrands,
  selectProductCategories,
} from "../../features/api/apiSlice"
import { RadioGroup } from "@headlessui/react"
import { ratingFilters } from "../../assets/filtersDB"

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
      <HiOrderAccordion
        value="category"
        isOpen={isOpen}
        handleOpenObj={handleOpenObj}
      >
        <ul className="flex flex-col gap-2">
          {categories?.map((category, i) => (
            <Link to={"/" + category} key={i}>
              <p className="capitalize hover:underline">{category}</p>
            </Link>
          ))}
        </ul>
      </HiOrderAccordion>

      <HiOrderAccordion
        value="brands"
        isOpen={isOpen}
        handleOpenObj={handleOpenObj}
      >
        <ul className="flex flex-col gap-2">
          {brands?.map((brand, i) => (
            <Link to={"/" + brand} key={i}>
              <p className="hover:underline">{brand}</p>
            </Link>
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
        <RatingModule className="p-2 pr-0" />
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
  <Accordion
    open={isOpen(value)}
    icon={<HiOrderMdKeyboardArrowDown active={isOpen(value)} />}
  >
    <AccordionHeader
      className="group border-none text-body hover:text-theme"
      onClick={() => handleOpenObj(value)}
    >
      <h6 className={label ? "" : "capitalize"}>{label ?? value}</h6>
    </AccordionHeader>
    <AccordionBody {...rest} className="text-body">
      {children}
    </AccordionBody>
  </Accordion>
)

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

      <Button
        size="lg"
        disabled={isDisabled}
        className="mt-2 w-full bg-theme px-2 text-center disabled:pointer-events-auto disabled:cursor-not-allowed disabled:bg-blue-gray-200 disabled:text-body disabled:opacity-100"
      >
        <h6>Apply Price Range</h6>
      </Button>
    </div>
  )
}

const RatingModule = (props) => {
  const { className, ...rest } = props
  const [rating, setRating] = useState(ratingFilters[0].value)

  const radioClasses = (checked) =>
    `${
      checked
        ? "opacity-100 drop-shadow-xl"
        : "opacity-30 group-hover:opacity-50"
    } text-2xl text-theme`

  return (
    <RadioGroup
      name="rated"
      value={rating}
      onChange={setRating}
      className={`flex flex-col gap-2 ${className ?? ""}`}
      {...rest}
    >
      <RadioGroup.Label className="hidden">Customer Rating</RadioGroup.Label>
      {ratingFilters?.map((option) => (
        <RadioGroup.Option
          key={option.id}
          value={option.value}
          className={`group
        inline-flex w-max cursor-pointer items-center gap-1 px-1 leading-none`}
        >
          {({ checked }) => (
            <>
              {checked ? (
                <MdRadioButtonChecked className={radioClasses(checked)} />
              ) : (
                <MdRadioButtonUnchecked className={radioClasses(checked)} />
              )}
              {!!option.value && <RatingBar rating={option.value} />}
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

const HiOrderMdKeyboardArrowDown = (props) => (
  <MdKeyboardArrowDown
    className={`${
      props.active ? "rotate-180" : ""
    } h-5 w-5 text-gray-800 transition xl:h-8 xl:w-8`}
  />
)
