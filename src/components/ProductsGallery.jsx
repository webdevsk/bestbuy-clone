import Filters from "./Filters"
//Replace these with async api call functions
import { response } from "../assets/disposable"
const { products } = response

const ProductsGallery = () => {
  return (
    <>
      <section>
        <div className="container flex divide-x border-b">
          <div className="hidden xl:flex xl:w-1/6">
            <Filters products={products} />
          </div>
          <div className="w-1 grow">Hello</div>
        </div>
      </section>
    </>
  )
}

export default ProductsGallery
