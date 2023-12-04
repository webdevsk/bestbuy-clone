import LocaleCurrency from "../components/common/LocaleCurrency"
import RatingBar from "../components/common/RatingBar"
import { useGetProductQuery } from "../features/api/apiSlice"
import { useParams } from "react-router-dom"

const ProductPage = () => {
  const { productKey } = useParams()
  const {
    isLoading,
    isSuccess,
    isError,
    data: product = {
      images: [],
    },
  } = useGetProductQuery(productKey)
  console.log(useGetProductQuery(productKey))
  return (
    <>
      <section className="container py-6">
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

          <div className="product-image my-2 aspect-video lg:col-start-1 lg:row-span-6 lg:row-start-1">
            <img src={product.images[0]} alt={product.title} />
          </div>

          <div>
            <h4 className="first-letter:capitalize">{product.description}</h4>
          </div>

          <div className="row-start-5">
            <div className="text-important">
              <h6>
                SAVE{" "}
                <span className="currency">{product.discountPercentage}</span>
              </h6>
              <LocaleCurrency as="h1">{product.price}</LocaleCurrency>
            </div>
          </div>

          <div className="row-start-6 my-2 bg-gray-100 px-20 py-8">
            <h6>
              This item will be delivered as early as {new Date().toUTCString()}
            </h6>
            <button className="mt-4 w-full rounded-sm bg-yellow-700 px-6 py-3 transition-colors hover:bg-accent focus:opacity-80 disabled:bg-gray-400 disabled:opacity-50">
              <h5>Add to Cart</h5>
            </button>
          </div>
        </div>
      </section>
      <section className="container flex flex-col gap-2">
        <h3>About this Product</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi
          voluptatem officiis saepe? Aliquam, iste obcaecati. Veniam voluptate
          excepturi ea distinctio eos eius unde a, tempore, suscipit eum harum
          repellat tempora. Exercitationem illum quisquam unde alias quod nam
          obcaecati. Illo eius repudiandae magnam quisquam adipisci perspiciatis
          ad atque quasi. Minima suscipit eos error a? Perferendis iure natus,
          numquam hic laborum qui.
        </p>
      </section>
    </>
  )
}
export default ProductPage
