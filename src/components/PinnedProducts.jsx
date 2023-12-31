import { Button } from "@material-tailwind/react"
import { useSelector } from "react-redux"
import "swiper/css"
import "swiper/css/mousewheel"
import "swiper/css/pagination"
import { FreeMode, Mousewheel, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import { selectExclusiveProducts } from "../features/api/apiSlice"
import Product from "./common/Product"

const PinnedProducts = () => {
  const exclusiveProducts = useSelector((state) =>
    selectExclusiveProducts(state),
  )

  return (
    <>
      <section
        id="pinned-product"
        className="container bg-gradient-to-b from-blue-gray-50/70 from-0% to-blue-gray-100 to-100% py-6 xl:rounded-xl"
      >
        <div className="grid gap-4 2xl:grid-cols-[1fr_2fr]">
          <div className="flex flex-col gap-y-2">
            <svg
              className="-mx-1 -my-5 w-24 fill-theme"
              viewBox="0 0 64 64"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <g data-name="33 discount ticket" id="_33_discount_ticket">
                  {" "}
                  <path d="M57.46,27.91H59.5a1,1,0,0,0,1-1V18.76a2.027,2.027,0,0,0-2.02-2.02H5.52A2.027,2.027,0,0,0,3.5,18.76v8.15a1,1,0,0,0,1,1H6.54a4.09,4.09,0,1,1,0,8.18H4.5a1,1,0,0,0-1,1v8.15a2.027,2.027,0,0,0,2.02,2.02H58.48a2.027,2.027,0,0,0,2.02-2.02V37.09a1,1,0,0,0-1-1H57.46a4.09,4.09,0,1,1,0-8.18Zm0,10.18H58.5l-.02,7.17L5.5,45.24V38.09H6.54a6.09,6.09,0,0,0,0-12.18H5.5l.02-7.17,52.98.02v7.15H57.46a6.09,6.09,0,0,0,0,12.18Z"></path>{" "}
                  <path d="M32,20.814a1,1,0,0,0-1,1v2.038a1,1,0,1,0,2,0V21.814A1,1,0,0,0,32,20.814Z"></path>{" "}
                  <path d="M32,39.148a1,1,0,0,0-1,1v2.038a1,1,0,1,0,2,0V40.148A1,1,0,0,0,32,39.148Z"></path>{" "}
                  <path d="M32,33.037a1,1,0,0,0-1,1v2.037a1,1,0,0,0,2,0V34.037A1,1,0,0,0,32,33.037Z"></path>{" "}
                  <path d="M32,26.926a1,1,0,0,0-1,1v2.037a1,1,0,0,0,2,0V27.926A1,1,0,0,0,32,26.926Z"></path>{" "}
                  <path d="M16.722,26.889H20.8a1,1,0,0,0,0-2H16.722a1,1,0,0,0,0,2Z"></path>{" "}
                  <path d="M16.722,33h6.111a1,1,0,0,0,0-2H16.722a1,1,0,0,0,0,2Z"></path>{" "}
                  <path d="M24.871,37.111H16.722a1,1,0,0,0,0,2h8.149a1,1,0,1,0,0-2Z"></path>{" "}
                  <path d="M39.13,24.89a3.035,3.035,0,1,0,3.04,3.04A3.045,3.045,0,0,0,39.13,24.89Zm0,4.07a1.035,1.035,0,1,1,1.04-1.03A1.037,1.037,0,0,1,39.13,28.96Z"></path>{" "}
                  <path d="M47.28,33.04a3.035,3.035,0,1,0,3.03,3.03A3.037,3.037,0,0,0,47.28,33.04Zm0,4.07a1.035,1.035,0,1,1,0-2.07,1.035,1.035,0,0,1,0,2.07Z"></path>{" "}
                  <path d="M49,26.2a1,1,0,0,0-1.414,0L37.4,36.386A1,1,0,1,0,38.818,37.8L49,27.614A1,1,0,0,0,49,26.2Z"></path>{" "}
                </g>{" "}
              </g>
            </svg>

            <h2>Explore new tech for work, school, and play.</h2>

            <p>
              Shop the latest and greatest tech for your best work and virtual
              adventures yet.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[52px_minmax(0,_1fr)_52px]">
            <div className="swiper-prev-shadow hidden place-items-center lg:grid">
              <Button
                ripple={false}
                className={`swiper-btn-prev rounded-full bg-white stroke-theme p-2 opacity-70 shadow-sm hover:opacity-100 hover:shadow-none disabled:bg-transparent disabled:stroke-gray-500 disabled:opacity-100 disabled:shadow-none`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  className="h-7 w-7 stroke-inherit"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </Button>
            </div>

            <div>
              <Swiper
                // More styles at index.css@30
                modules={[Pagination, Mousewheel, FreeMode]}
                navigation={{
                  prevEl: ".swiper-btn-prev",
                  nextEl: ".swiper-btn-next",
                }}
                pagination={{ clickable: true }}
                slidesPerView={2}
                spaceBetween={8}
                freeMode
                mousewheel={{ forceToAxis: true }}
                breakpoints={{
                  720: {
                    slidesPerView: 3,
                  },
                  960: {
                    slidesPerView: 4,
                    spaceBetween: 16,
                  },
                }}
              >
                {exclusiveProducts?.map((product) => (
                  <SwiperSlide key={product.id}>
                    <Product
                      product={product}
                      className={`flex flex-col gap-4 rounded-lg bg-white p-4`}
                    >
                      <Product.Image />
                      <Product.Description>
                        <Product.Label className="font-serif text-sm font-medium" />
                        <Product.Rating />
                        <Product.Price />
                        {/* <Product.Button /> */}
                      </Product.Description>
                    </Product>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div className="swiper-next-shadow hidden place-items-center lg:grid">
              <Button
                ripple={false}
                className={`swiper-btn-next rounded-full bg-white stroke-theme p-2 opacity-70 shadow-sm hover:opacity-100 hover:shadow-none disabled:bg-transparent disabled:stroke-gray-500 disabled:opacity-100 disabled:shadow-none`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  className="h-7 w-7 stroke-inherit"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default PinnedProducts
