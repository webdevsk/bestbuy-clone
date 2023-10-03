import Filters from "./Filters"
//Replace these with async api call functions
import { Button, Typography } from "@material-tailwind/react"
import Sort from "./Sort"
import { IoOptionsOutline } from "react-icons/io5"
import { Fragment, useState } from "react"
import { Dialog, Transition } from "@headlessui/react"
import { useProductsContext } from "../contexts/ProductsContext"
import Product from "./Product"

const ProductsGallery = () => {
  const products = useProductsContext()
  return (
    <>
      <section>
        <div className="container flex divide-[#e0e6ef] border-[#e0e6ef] xl:divide-x xl:border-b xl:px-0">
          <div className="hidden divide-y xl:block xl:w-1/6 [&>*]:pr-3">
            <Filters />
          </div>

          <div className="w-1 grow xl:pl-6 xl:pt-6">
            <div className="flex justify-between rounded-md bg-gray-100 p-4 xl:justify-end">
              <div className="flex items-center gap-2">
                <Typography className="hidden sm:block">Sort</Typography>

                <Sort />
              </div>
              <FilterForMobile />
            </div>

            <div className="mt-4 grid gap-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-4">
              {products.map((product) => (
                <Product
                  key={product.id}
                  product={product}
                  className="flex flex-col gap-2 rounded-lg bg-gray-50 p-4 xl:gap-4"
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
  const closeModal = () => setIsOpen(false)
  const openModal = () => setIsOpen(true)
  return (
    <div className="xl:hidden">
      <button
        onClick={openModal}
        className="flex items-center gap-2 rounded-sm border border-theme bg-white px-9 py-3 text-theme ring-4 ring-transparent ring-offset-4 ring-offset-transparent transition hover:bg-gray-200 hover:ring-offset-blue-100"
      >
        <IoOptionsOutline className="h-5 w-5" />
        <Typography variant="h6">Filters</Typography>
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-hidden">
            <div className="flex min-h-full w-full items-end">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="opacity-0 translate-y-full"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-full"
              >
                <Dialog.Panel className="w-full transform overflow-hidden rounded-t-xl bg-white p-3 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-md font-bold leading-6 text-body antialiased"
                  >
                    Filters
                  </Dialog.Title>
                  {/* Actual content */}
                  <div className="mt-3 h-[50dvh] divide-y overflow-x-hidden overflow-y-scroll">
                    <Filters />
                  </div>

                  <div className="mt-4">
                    <Button
                      size="lg"
                      className=" w-full bg-theme px-2 text-center disabled:pointer-events-auto disabled:cursor-not-allowed disabled:bg-blue-gray-200 disabled:text-body disabled:opacity-100"
                    >
                      <Typography variant="h6">Apply</Typography>
                    </Button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}
