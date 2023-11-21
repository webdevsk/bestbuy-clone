import { useGetProductQuery } from "../features/api/apiSlice"
import { useParams } from "react-router-dom"

const ProductPage = () => {
  const { id } = useParams()
  const {
    isLoading,
    isSuccess,
    isError,
    data: product = {
      images: [],
    },
  } = useGetProductQuery(id)
  console.log(product)

  return (
    <section className="container py-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="product-image">
          <img src={product.images[0]} alt={product.title} />
        </div>

        <div className="flex flex-col gap-2">
          <h2>{product.title}</h2>

          <div className="flex"></div>
        </div>
      </div>
    </section>
  )
}
export default ProductPage
