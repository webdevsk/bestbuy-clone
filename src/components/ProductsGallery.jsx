import Filters from "./Filters"
//Replace these with async api call functions
import { response } from "../assets/disposable"
const { products } = response

const ProductsGallery = () => {
  return (
    <>
      <section>
        <div className="container flex divide-x border-b xl:px-0">
          <div className="hidden xl:block xl:w-1/6">
            <Filters products={products} />
          </div>
          <div className="w-1 grow xl:pl-6 xl:pt-6">Hello</div>
        </div>
      </section>
    </>
  )
}

export default ProductsGallery
