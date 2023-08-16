import { Typography } from "@material-tailwind/react"
import { Link } from "react-router-dom"

const ProductItem = ({
  product,
  imageClass,
  imageProps,
  labelClass,
  labelProps,
}) => {
  return (
    <>
      <div className="">
        <img
          className={`h-full w-full object-contain ${imageClass}`}
          src={product?.thumbnail}
          alt={product?.title}
          {...imageProps}
        />
      </div>
      <Link
        to={`/product/${product?.id}`}
        className={`text-link antialiased hover:underline ${labelClass}`}
        {...labelProps}
      >
        {product?.title}
      </Link>
    </>
  )
}

export default ProductItem
