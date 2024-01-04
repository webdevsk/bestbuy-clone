import { IoShieldCheckmarkOutline } from "react-icons/io5"
import LocaleCurrency from "../components/common/LocaleCurrency"
import RatingBar from "../components/common/RatingBar"
import { useGetProductQuery } from "../features/api/apiSlice"
import { useParams } from "react-router-dom"
import { TbTruckReturn } from "react-icons/tb"
import { IoIosArrowForward } from "react-icons/io"

const ProductPage = () => {
  const { productKey } = useParams()
  // const {
  //   isLoading,
  //   isSuccess,
  //   isError,
  //   data: product = {
  //     images: [],
  //   },
  // } = useGetProductQuery(productKey)
  const isLoading = false
  const product = {
    id: "65671780ebcec8c9a373cb4d",
    productId: 1,
    productKey: "iphone-9.1",
    title: "iPhone 9",
    description: "An apple mobile which is nothing like apple",
    price: 549,
    discountPercentage: 12.96,
    rating: 4.76,
    stock: 94,
    brand: "Apple",
    category: "smartphones",
    thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
    images: [
      "https://i.dummyjson.com/data/products/1/1.jpg",
      "https://i.dummyjson.com/data/products/1/2.jpg",
      "https://i.dummyjson.com/data/products/1/3.jpg",
      "https://i.dummyjson.com/data/products/1/4.jpg",
      "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
    ],
  }
  return (
    <>
      <section className="reset container mt-12 xl:mt-24">
        <div className="grid grid-cols-1 gap-x-4 gap-y-1 lg:grid-cols-2">
          <div className="product-title flex flex-col gap-1 lg:col-start-2">
            <h2 className="font-medium capitalize">{product.title}</h2>

            <div className="flex flex-col gap-1 [&_h6]:inline">
              <div>
                <h6>Brand: </h6>
                <a to={"#"} className="capitalize text-theme">
                  <h6>{product.brand}</h6>
                </a>
              </div>
              <div>
                <h6>Category: </h6>
                <a to={"#"} className="capitalize text-theme">
                  <h6>{product.category}</h6>
                </a>
              </div>
              <RatingBar text rating={product.rating} />
            </div>
          </div>

          <div
            className={`product-image my-2 grid aspect-video place-items-center lg:col-start-1 lg:row-span-6 lg:row-start-1 ${
              isLoading ? "animate-pulse bg-gray-300" : ""
            }`}
          >
            <img src={product.images[0]} alt={product.title} />
          </div>

          <div>
            <h6 className="first-letter:capitalize">{product.description}</h6>
          </div>

          <div className="row-start-5">
            <div className="text-important">
              <h6>
                SAVE{" "}
                <span className="currency">{product.discountPercentage}</span>
              </h6>
              <LocaleCurrency as="h2">{product.price}</LocaleCurrency>
            </div>
          </div>

          <div className="row-start-6 my-2 bg-blue-50/40 px-20 py-8">
            <h6>
              This item will be delivered as early as {new Date().toUTCString()}
            </h6>
            <button className="mt-4 w-full rounded-sm bg-yellow-700 px-6 py-3 transition-colors hover:bg-accent focus:opacity-80 disabled:bg-gray-400 disabled:opacity-50">
              <h5>Add to Cart</h5>
            </button>
          </div>
        </div>
      </section>
      <section className="container grid grid-cols-1 gap-4 py-4 lg:grid-cols-2">
        <div className="flex flex-col gap-3">
          <h3>About this Product</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi
            voluptatem officiis saepe? Aliquam, iste obcaecati. Veniam voluptate
            excepturi ea distinctio eos eius unde a, tempore, suscipit eum harum
            repellat tempora. Exercitationem illum quisquam unde alias quod nam
            obcaecati. Illo eius repudiandae magnam quisquam adipisci
            perspiciatis ad atque quasi. Minima suscipit eos error a?
            Perferendis iure natus, numquam hic laborum qui.
          </p>
          <div className="grid grid-cols-1 gap-4 rounded-md bg-blue-50/40 p-4 sm:grid-cols-2">
            <div className="flex gap-4">
              <IoShieldCheckmarkOutline className="text-3xl" />
              <div>
                <h6>Manufacturers Warranty</h6>
                <small className="block">Parts and Labour: 1 year</small>
              </div>
            </div>
            <div className="flex gap-4">
              <TbTruckReturn className="text-3xl" />
              <div>
                <h6>Return Policy</h6>
                <small className="block">30 days to return or exchange</small>
                <a
                  href="#"
                  className="text-theme hover:text-theme hover:underline"
                >
                  <small>Read return policy</small>
                  <IoIosArrowForward className="inline" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
export default ProductPage
