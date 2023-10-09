import ProductsGallery from "../features/products/ProductsGallery"
import Hero from "../components/Hero"
import PinnedProducts from "../components/PinnedProducts"

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
