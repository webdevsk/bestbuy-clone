import Filters from "./Filters"
//Replace these with async api call functions
import { Button, Drawer, Typography } from "@material-tailwind/react"
import Sort from "./Sort"
import { IoOptionsOutline } from "react-icons/io5"
import { useEffect, useState } from "react"
import Product from "./Product"
import { FloatingOverlay, FloatingPortal } from "@floating-ui/react"
import { IoIosClose } from "react-icons/io"
import { Desktop, Mobile } from "./ui/ReactResponsive"
import { useSelector, useDispatch } from "react-redux"
import {
  fetchProducts,
  selectAllProducts,
} from "../features/products/productsSlice"

const ProductsGallery = () => {
  const status = useSelector((state) => state.products.status)
  const products = useSelector((state) => selectAllProducts(state))
  const dispatch = useDispatch()

  useEffect(() => {
    if (status === "idle") dispatch(fetchProducts())
  }, [dispatch, status])

  if (useSelector((state) => state.products.error)) {
    return <p>error</p>
  }

  return (
    status === "success" && (
      <>
        <section>
          <div className="container flex divide-[#e0e6ef] border-[#e0e6ef] xl:divide-x xl:border-b xl:px-0">
            <Desktop>
              <div className=" divide-y xl:w-1/6 [&>*]:pr-3">
                <Filters />
              </div>
            </Desktop>

            <div className="w-1 grow xl:pl-6 xl:pt-6">
              <div className="flex justify-between rounded-md bg-gray-100 p-4 xl:justify-end">
                <div className="flex items-center gap-2">
                  <Typography className="hidden sm:block">Sort</Typography>

                  <Sort />
                </div>
                <Mobile>
                  <FilterForMobile />
                </Mobile>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-4">
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
  )
}

export default ProductsGallery

const FilterForMobile = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 rounded-sm border border-theme bg-white px-9 py-3 text-theme ring-4 ring-transparent ring-offset-4 ring-offset-transparent transition hover:bg-gray-200 hover:ring-offset-blue-100"
      >
        <IoOptionsOutline className="h-5 w-5" />
        <Typography variant="h6">Filters</Typography>
      </button>
      <Drawer
        placement="bottom"
        open={isOpen}
        size={500}
        dismiss={{ outsidePress: true }}
        overlay={false}
        overlayProps={{ className: "bg-black/30 inset-0 fixed" }}
        onClose={() => setIsOpen(false)}
        className="flex flex-col rounded-t-xl border pt-4"
      >
        <div className="flex h-full flex-col divide-y overflow-x-hidden overflow-y-scroll [&>*]:px-4">
          <div className="sticky top-0 z-[1] flex items-center justify-between rounded-t-xl bg-white pb-4">
            <Typography variant="h4">Filters</Typography>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-sm hover:bg-gray-100"
            >
              <IoIosClose className="h-6 w-6" />
            </button>
          </div>
          <Filters />
          <div className="sticky bottom-0 z-[1] mt-auto bg-white px-4 py-4">
            <Button
              size="lg"
              className="w-full bg-theme px-2 text-center disabled:pointer-events-auto disabled:cursor-not-allowed disabled:bg-blue-gray-200 disabled:text-body disabled:opacity-100"
            >
              <Typography variant="h6">Apply</Typography>
            </Button>
          </div>
        </div>
        {isOpen && (
          <FloatingPortal>
            <FloatingOverlay
              lockScroll
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-20 bg-black/30"
            ></FloatingOverlay>
          </FloatingPortal>
        )}
      </Drawer>
    </>
  )
}
