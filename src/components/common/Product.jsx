import { useAuth0 } from "@auth0/auth0-react"
import { Button } from "@material-tailwind/react"
import {
  createContext,
  forwardRef,
  memo,
  useCallback,
  useContext,
  useState,
} from "react"
import { Link } from "react-router-dom"
import { useAddToCartMutation } from "../../features/api/apiSlice"
import RatingBar from "./RatingBar"
import { toast } from "react-toastify"
import LocaleCurrency from "./LocaleCurrency"
//Contexts
const ProductContext = createContext(null)
const useProductContext = () => useContext(ProductContext)

const Product = memo((props) => {
  const { product, children, className, ...filteredProps } = props

  return (
    <ProductContext.Provider value={product}>
      <div {...filteredProps} className={`group relative ${className}`}>
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
  return <p className={`${props.className ?? ""} `}>{product?.title}</p>
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
  return (
    <div className="flex flex-col justify-between">
      {props.withDiscount && product?.discountPercentage > 0 && (
        <LocaleCurrency as="h6" className="currency line-through">
          {product?.price / (1 - product?.discountPercentage / 100)}
        </LocaleCurrency>
      )}

      <LocaleCurrency
        as="h4"
        className={`currency ${
          product?.discountPercentage > 0 &&
          props.withDiscount &&
          "text-red-900"
        }`}
      >
        {product?.price}
      </LocaleCurrency>
    </div>
  )
}
Product.Price = memo(ProductPrice)

// Product add to cart component
const ProductButton = forwardRef((props, ref) => {
  const product = useProductContext()
  const { isAuthenticated, user } = useAuth0()
  const [addToCart, { isLoading }] = useAddToCartMutation()

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.error("Please login first")
      return
    }
    try {
      await addToCart({
        email: user.email,
        itemId: product.id,
      }).unwrap()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Button
      {...props}
      ref={ref}
      className={`${
        props.className ?? ""
      } z-[1] mt-auto bg-gray-200 text-black hover:bg-accent disabled:pointer-events-auto`}
      onClick={handleAddToCart}
      disabled={isLoading}
    >
      <h6>Add to Cart</h6>
    </Button>
  )
})
ProductButton.displayName = "ProductButton"
Product.Button = memo(ProductButton)

export default Product
