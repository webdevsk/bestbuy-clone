import { Button, Typography } from "@material-tailwind/react"
import {
  createContext,
  forwardRef,
  memo,
  useCallback,
  useContext,
  useState,
} from "react"
import RatingBar from "../../components/common/RatingBar"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { addToCart } from "../cart/cartItemsSlice"

//Contexts
const ProductContext = createContext(null)
const useProductContext = () => useContext(ProductContext)

const Product = memo((props) => {
  const { product, children, className, ...filteredProps } = props

  return (
    <ProductContext.Provider value={product}>
      <div {...filteredProps} className={`group relative ${className ?? ""}`}>
        {children}
        <div className="absolute inset-0 z-0">
          <Link
            className="block h-full w-full"
            to={`/product/${product.id}`}
          ></Link>
        </div>
      </div>
    </ProductContext.Provider>
  )
})
Product.displayName = "Product"

//Product Image component
const ProductImage = (props) => {
  const product = useProductContext()
  const [isLoaded, setIsLoaded] = useState(false)
  return (
    <div className={`relative`}>
      <img
        {...props}
        onLoad={() => setIsLoaded(true)}
        className={`aspect-square w-full object-contain ${
          props.className ?? ""
        } ${!isLoaded ? "invisible" : ""}`}
        src={product?.thumbnail}
        alt={product?.title}
        loading="lazy"
      />
      <div className={` absolute inset-0`}>
        {!isLoaded && (
          <div className="grid h-full w-full animate-pulse place-items-center bg-blue-gray-100 text-gray-700 backdrop-blur-lg">
            Loading...
          </div>
        )}
      </div>
    </div>
  )
}
Product.Image = memo(ProductImage)

//Product Description component
const ProductDescription = (props) => {
  return (
    <div
      {...props}
      className={`flex h-full flex-col gap-1 ${props.className ?? ""}`}
    >
      {props.children}
    </div>
  )
}
Product.Description = memo(ProductDescription)

//Product Label component
const ProductLabel = (props) => {
  const product = useProductContext()
  return (
    <Typography
      className={`${props.className ?? ""} `}
      variant={props.variant ?? "paragraph"}
    >
      {product?.title}
    </Typography>
  )
}
Product.Label = ProductLabel

// Product Rating component
const ProductRating = (props) => {
  const product = useProductContext()
  return <RatingBar {...props} rating={product?.rating} />
}
Product.Rating = memo(ProductRating)

// Product Price component
const ProductPrice = (props) => {
  const product = useProductContext()

  const { locale = "en-US", currency = "USD" } = props

  const format = useCallback(
    (args) =>
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currency,
      }).format(args),
    [locale, currency],
  )

  return (
    <div className="flex flex-col justify-between">
      {props.withDiscount && product?.discountPercentage > 0 && (
        <Typography className="currency line-through" variant="h6">
          {format(product?.price / (1 - product?.discountPercentage / 100))}
        </Typography>
      )}

      <Typography
        variant="h4"
        className={`currency ${
          product?.discountPercentage > 0 &&
          props.withDiscount &&
          "text-red-900"
        }`}
      >
        {format(product?.price)}
      </Typography>
    </div>
  )
}
Product.Price = memo(ProductPrice)

// Product add to cart component
const ProductButton = forwardRef((props, ref) => {
  const product = useProductContext()
  const dispatch = useDispatch()
  // const cartIds = useSelector((state) => selectCartItemIds(state))
  return (
    <Button
      {...props}
      ref={ref}
      className={`${
        props.className ?? ""
      } z-[1] mt-auto bg-gray-200 text-black hover:bg-accent`}
      onClick={() => dispatch(addToCart(product.id))}
    >
      <Typography variant="h6">Add to Cart</Typography>
    </Button>
  )
})
ProductButton.displayName = "ProductButton"
Product.Button = memo(ProductButton)

export default Product
