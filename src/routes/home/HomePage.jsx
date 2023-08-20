import ProductItem from "../../components/ProductItem"
import ProductsGallery from "../../components/ProductsGallery"
import Hero from "./Hero"
import PinnedProducts from "./PinnedProducts"

const HomePage = () => {
  return (
    <>
      <Hero />
      <PinnedProducts />
      <ProductsGallery />
    </>
  )
}

export default HomePage
