import { response } from "../assets/disposable"
import ProductsContext from "../contexts/ProductsContext"
import ProductsGallery from "../features/products/ProductsGallery"
import Hero from "../components/Hero"
import PinnedProducts from "../components/PinnedProducts"
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
