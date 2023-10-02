import Filters from "./Filters"
//Replace these with async api call functions
import { response } from "../assets/disposable"
import { Typography } from "@material-tailwind/react"
import Sort from "./Sort"
import ProductItem from "./ProductItem"
const { products } = response

const ProductsGallery = () => {
  return (
    <>
      <section>
        <div className="container flex divide-[#e0e6ef] border-[#e0e6ef] xl:divide-x xl:border-b xl:px-0">
          <div className="hidden divide-y xl:block xl:w-1/6 [&>*]:pr-3">
            <Filters products={products} />
          </div>

          <div className="w-1 grow xl:pl-6 xl:pt-6">
            <div className="flex rounded-md bg-gray-100 p-4 xl:justify-between">
              <div></div>

              <div className="flex items-center gap-2">
                <Typography className="sm:max-lg:text-white">Sort</Typography>

                <Sort />
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-4">
              {products.map((product) => (
                <div
                  key={product?.id}
                  className="flex flex-col gap-2 rounded-lg bg-gray-50 p-4 xl:gap-4"
                >
                  <ProductItem
                    product={product}
                    showDiscount
                    showRating
                    showAddtocart
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ProductsGallery
