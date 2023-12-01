import Filters from "./common/Filters"
//Replace these with async api call functions
import { Button } from "@material-tailwind/react"
import Sort from "./common/Sort"
import { IoOptionsOutline } from "react-icons/io5"
import { useState } from "react"
import Product from "./common/Product"
import { IoIosClose } from "react-icons/io"
import { Desktop, Mobile } from "./common/ReactResponsive"
import {
  useGetProductsQuery,
  useGetProductsQueryState,
} from "../features/api/apiSlice"
import { AnimatePresence, motion } from "framer-motion"
import { Dialog } from "@headlessui/react"
import { useSearchParams } from "react-router-dom"

const ProductsGallery = () => {
  const [searchParams] = useSearchParams()
  const params = Object.fromEntries(searchParams.entries())
  const { isError, isLoading, isFetching } = useGetProductsQuery(params)

  const { data = { entities: {} } } = useGetProductsQueryState(params)
  const products = Object.values(data.entities)

  return (
    <>
      <section>
        <div className="container flex divide-[#e0e6ef] border-[#e0e6ef] xl:divide-x xl:border-b xl:px-0">
          <Desktop>
            <div className=" relative divide-y xl:w-1/6 [&>*]:pr-3">
              <div className="sticky bottom-0">
                <Filters />
              </div>
            </div>
          </Desktop>

          <div className="w-1 grow xl:pl-6 xl:pt-6">
            <div className="flex justify-between rounded-md bg-gray-100 p-4 xl:justify-end">
              <div className="flex items-center gap-2">
                <p className="hidden sm:block">Sort</p>

                <Sort />
              </div>
              <Mobile>
                <FilterForMobile />
              </Mobile>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-4">
              {isLoading && <ProductsGalleryPlaceholder />}
              {isError && <ProductsGalleryError />}
              {!isLoading && !products.length && (
                <NoProductsError isFetching={isFetching} />
              )}

              {products.map((product) => (
                <Product
                  key={product.id}
                  product={product}
                  className={`flex ${
                    isFetching ? "opacity-70" : ""
                  } flex-col gap-2 rounded-lg bg-gray-50 p-4 transition-colors hover:bg-gray-100 xl:gap-4`}
                >
                  <Product.Image />
                  <Product.Description>
                    <Product.Label />
                    <Product.Rating />
                    <Product.Price withDiscount />
                    <Product.Button />
                  </Product.Description>
                </Product>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ProductsGallery

const FilterForMobile = () => {
  const [isOpen, setIsOpen] = useState(false)

  const backdropVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0, transition: { delay: 0.3 } },
  }
  const drawerVariants = {
    visible: {
      y: "0%",
      transition: { delay: 0.3, duration: 0.3 },
    },
    hidden: {
      y: "100%",
      transition: { duration: 0.2 },
    },
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 rounded-sm border border-theme bg-white px-9 py-3 text-theme ring-4 ring-transparent ring-offset-4 ring-offset-transparent transition hover:bg-gray-200 hover:ring-offset-blue-100"
      >
        <IoOptionsOutline className="h-5 w-5" />
        <h6>Filters</h6>
      </button>

      <AnimatePresence>
        {isOpen && (
          <Dialog
            static
            as={motion.div}
            open={isOpen}
            onClose={() => setIsOpen(false)}
          >
            <Dialog.Backdrop
              as={motion.div}
              aria-hidden="true"
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-black/30"
            />

            <Dialog.Panel
              as={motion.div}
              variants={drawerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="fixed bottom-0 left-0 z-[9999] flex max-h-[75dvh] w-full flex-col px-4"
            >
              <div className="flex flex-col divide-y overflow-scroll overflow-x-hidden rounded-t-xl bg-white [&>*]:px-4">
                <div className="sticky top-0 z-[1] flex items-center justify-between  border-b bg-white py-4">
                  <h4>Filters</h4>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="rounded-sm hover:bg-gray-100"
                  >
                    <IoIosClose className="h-6 w-6" />
                  </button>
                </div>
                <Filters />
                {/* No need as queries are done on click */}
                {/* <div className="sticky bottom-0 z-[1] mt-auto bg-white px-4 py-4">
                  <Button
                    size="lg"
                    className="w-full bg-theme px-2 text-center disabled:pointer-events-auto disabled:cursor-not-allowed disabled:bg-blue-gray-200 disabled:text-body disabled:opacity-100"
                  >
                    <h6>Apply</h6>
                  </Button>
                </div> */}
              </div>
            </Dialog.Panel>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  )
}

function ProductsGalleryPlaceholder() {
  return Array.from({ length: 10 }).map((_, i) => (
    <div
      key={i}
      className={`flex animate-pulse flex-col gap-1 rounded-lg bg-gray-50 p-4 transition-colors [animation-delay:calc(500ms*var(--delay-by))] hover:bg-gray-100`}
      style={{
        "--delay-by": i,
      }}
    >
      <div className="aspect-square w-full bg-gray-200"></div>
      <div className="mt-auto h-4 w-1/2 rounded-xl bg-gray-400"></div>
      <div className=" h-4 w-1/3 rounded-xl bg-gray-300"></div>
      <div className=" h-4 w-1/4 rounded-xl bg-gray-300"></div>
      <div className=" h-5 w-1/3 rounded-xl bg-gray-400"></div>
      <div className="mt-auto h-12 w-full rounded-sm bg-gray-300"></div>
    </div>
  ))
}

function ProductsGalleryError() {
  return (
    <h5 className="col-span-full py-8 text-center text-lg font-semibold italic text-red-500">
      Server error. Failed to load data.
    </h5>
  )
}

function NoProductsError({ isFetching }) {
  return (
    <>
      <h5 className="col-span-full py-8 text-center text-lg font-semibold italic text-gray-400">
        No products available by the provided criteria.
      </h5>
      {isFetching && (
        <h5 className="col-span-full py-8 text-center text-lg font-semibold italic text-gray-400">
          Refreshing List...
        </h5>
      )}
    </>
  )
}
