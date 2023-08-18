import { Typography } from "@material-tailwind/react"
import { Link } from "react-router-dom"

const ProductItem = ({
  product,
  imageClass,
  imageProps,
  labelClass,
  labelProps,
  showDiscount = false,
  showRating = false,
}) => {
  const USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  })

  return (
    <>
      <div className="">
        <img
          className={`aspect-square w-full object-contain ${imageClass ?? ""}`}
          src={product?.thumbnail}
          alt={product?.title}
          {...imageProps}
        />
      </div>
      <Link
        to={`/product/${product?.id}`}
        className={`flex flex-col gap-1 antialiased ${labelClass ?? ""}`}
        {...labelProps}
      >
        <p className="block font-serif text-xs font-medium antialiased hover:underline">
          {product?.title}
        </p>

        {showRating && <RatingBar rating={product?.rating} />}

        <div className="mt-2">
          {product?.discountPercentage > 0 && showDiscount && (
            <Typography className="currency line-through" variant="h6">
              {USDollar.format(
                product?.price / (1 - product?.discountPercentage / 100),
              )}
            </Typography>
          )}

          <Typography
            variant="h4"
            className={`currency ${
              product?.discountPercentage > 0 && showDiscount && "text-red-900"
            }`}
          >
            {USDollar.format(product?.price)}
          </Typography>
        </div>
      </Link>
    </>
  )
}

export default ProductItem

import "../components/ratingBar.css"

const RatingBar = ({ rating }) => (
  <div className="rating-bar relative flex w-max">
    <div
      style={{ width: `${(rating / 5) * 100 ?? 0}%` }}
      className="rating-bar_overlay absolute left-0 top-0 h-full"
    ></div>

    {Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1}
        className="h-4 w-4"
        stroke="#fecf0a"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
        />
      </svg>
    ))}
  </div>
)
