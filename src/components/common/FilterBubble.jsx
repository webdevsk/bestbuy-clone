import { IoIosClose } from "react-icons/io"
import { useSearchParams } from "react-router-dom"
import { ratingFilters, sortOptions } from "../../assets/filtersDB"
import LocaleCurrency from "./LocaleCurrency"

const FilterBubble = ({
  label,
  className,
  as: Tag = "div",
  childClassName,
  noLabel,
}) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const params = Object.fromEntries(searchParams.entries())
  function handleRemoveFilter(key) {
    setSearchParams((params) => {
      params.delete(key)
      return params
    })
  }
  if (searchParams.size && !!label && label in params)
    return (
      <Tag className={className}>
        <Bubble
          label={label}
          value={searchParams.get(label)}
          handleRemoveFilter={handleRemoveFilter}
          className={childClassName}
          noLabel={noLabel}
        />
      </Tag>
    )

  if (searchParams.size && !label)
    return (
      <Tag className={className}>
        {Object.entries(params).map(([key, value]) => (
          <Bubble
            key={key}
            label={key}
            value={value}
            handleRemoveFilter={handleRemoveFilter}
            className={childClassName}
            noLabel={noLabel}
          />
        ))}
        <button
          type="button"
          title="Clear All"
          onClick={() => setSearchParams("")}
          className="rounded-full border bg-red-50 px-3 py-1 leading-none text-error transition-colors hover:bg-red-100"
        >
          <small>Clear All</small>
        </button>
      </Tag>
    )
}
export default FilterBubble

const Bubble = ({
  label,
  value,
  handleRemoveFilter,
  childClassName: className,
  noLabel,
}) => {
  return (
    <div
      key={label}
      data-filter-key={label}
      data-filter-value={value}
      className={`flex items-center gap-1 rounded-full border border-gray-300 bg-gray-50 px-1 py-1 leading-none transition-colors hover:bg-gray-100 ${
        className || ""
      }}`}
    >
      <small className="ms-1 select-none leading-normal">
        {!noLabel && (
          <>
            <span className="capitalize">{label}</span>
            <span>: </span>
          </>
        )}
        <span>
          {label === "rating"
            ? ratingFilters?.find((filter) => filter.value === value).label ??
              value
            : label === "price"
            ? value.split("to").map((x, i) => (
                <>
                  {!!x && i === 0 && <span> from </span>}
                  {!!x && i === 1 && <span> upto </span>}
                  {!!x && (
                    <LocaleCurrency as="span" key={x}>
                      {parseFloat(x)}
                    </LocaleCurrency>
                  )}
                </>
              ))
            : label === "sortby"
            ? sortOptions?.find((option) => option.value === value).label ??
              value
            : value}
        </span>
      </small>
      <button title="Remove this filter">
        <IoIosClose
          className="rounded-full border border-transparent text-xl transition-colors hover:border-gray-400 hover:bg-gray-300"
          onClick={() => handleRemoveFilter(label)}
        />
      </button>
    </div>
  )
}
