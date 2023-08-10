import { Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";

const ProductItem = ({product, imageClass, imageProps, labelClass, labelProps}) => {

  return (
    <>
    <div>
        <img className={`aspect-video max-w-full object-contain ${imageClass}`} src={product?.thumbnail} alt={product?.title} {...imageProps}/>
    </div>
    <Link to={`/product/${product?.id}`} className={`antialiased hover:underline text-link ${labelClass}`} {...labelProps}>
        {product?.title}
    </Link>
    </>
  )
}

export default ProductItem