import { Typography } from "@material-tailwind/react"
import { Link } from "react-router-dom"
import RatingBar from "./RatingBar"

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
          loading="lazy"
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
