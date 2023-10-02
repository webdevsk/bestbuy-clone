import { createContext, useContext } from "react"

const ProductsContext = createContext(null)
export const useProductsContext = () => useContext(ProductsContext)
export default ProductsContext
