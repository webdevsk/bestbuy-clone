import { response } from "../../assets/disposable"
import ProductsGallery from "../../components/ProductsGallery"
import ProductsContext from "../../contexts/ProductsContext"
import Hero from "./Hero"
import PinnedProducts from "./PinnedProducts"
const { products } = response

const HomePage = () => {
  return (
    <ProductsContext.Provider value={products}>
      <Hero />
      <PinnedProducts />
      <ProductsGallery />
    </ProductsContext.Provider>
  )
}

export default HomePage
