import Filters from "./Filters"
//Replace these with async api call functions
import { response } from "../assets/disposable"
import { Typography } from "@material-tailwind/react"
import Sort from "./Sort"
const { products } = response

const ProductsGallery = () => {
  return (
    <>
      <section>
        <div className="container flex divide-x divide-[#e0e6ef] border-b border-[#e0e6ef] xl:px-0">
          <div className="hidden xl:block xl:w-1/6">
            <Filters products={products} />
          </div>
          <div className="w-1 grow xl:pl-6 xl:pt-6">
            <div className="flex justify-between rounded-md bg-gray-100 p-4">
              <div></div>
              <div className="flex items-center gap-2">
                <Typography>Sort</Typography>
                <Sort />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ProductsGallery
