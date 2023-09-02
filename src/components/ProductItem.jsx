import { Button, Typography } from "@material-tailwind/react"
import { Link } from "react-router-dom"
import RatingBar from "./RatingBar"

const ProductItem = ({
  product,
  imageClass,
  imageProps,
  labelClass,
  labelProps,
  titleVariant = "paragraph",
  titleClass,
  showDiscount = false,
  showRating = false,
  showAddtocart = false,
}) => {
  const USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  })

  return (
    <>
      <Link to={`/product/${product?.id}`} className="">
        <img
          className={`aspect-square w-full object-contain ${imageClass ?? ""}`}
          src={product?.thumbnail}
          alt={product?.title}
          loading="lazy"
          {...imageProps}
        />
      </Link>

      {/* label column */}
      <div
        className={`flex h-full flex-col justify-between gap-1 antialiased ${
          labelClass ?? ""
        }`}
        {...labelProps}
      >
        <div className="flex flex-col gap-y-1">
          <Link to={`/product/${product?.id}`}>
            <Typography
              className={`${titleClass} hover:underline`}
              variant={titleVariant}
            >
              {product?.title}
            </Typography>
          </Link>

          {showRating && <RatingBar rating={product?.rating} />}

          <div className="flex flex-col justify-between">
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
                product?.discountPercentage > 0 &&
                showDiscount &&
                "text-red-900"
              }`}
            >
              {USDollar.format(product?.price)}
            </Typography>
          </div>
        </div>
        <div>
          {showAddtocart && (
            <Button
              className={`mt-4 w-full bg-gray-200 text-black hover:bg-accent`}
            >
              <Typography variant="h6">Add to Cart</Typography>
            </Button>
          )}
        </div>
      </div>
    </>
  )
}

export default ProductItem
