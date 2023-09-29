import { Button, Typography } from "@material-tailwind/react"
import { Swiper, SwiperSlide, useSwiperSlide } from "swiper/react"

import "swiper/css/pagination"
import "swiper/css"

const Hero = () => {
  return (
    <section>
      <Swiper
        slidesPerView={1}
        loop
        allowTouchMove={false}
        speed={3000}
        autoplay
      >
        <SwiperSlide>
          <CallToAction1 />
        </SwiperSlide>
        <SwiperSlide>
          <CallToAction2 />
        </SwiperSlide>
      </Swiper>
    </section>
  )
}

export default Hero

const CallToAction1 = () => {
  const swiperSlide = useSwiperSlide()

  return (
    <div className="flex items-center bg-gradient-to-b from-[#fcc31e] to-[#f9e319] py-12 xl:py-24">
      <div
        className={`container transition-transform duration-[4000ms] ${
          swiperSlide.isActive ? "xl:translate-x-0" : "xl:translate-x-24"
        }`}
      >
        <div className="grid grid-cols-1 items-center gap-x-8 gap-y-8 xl:grid-cols-2 xl:gap-y-4">
          <div className="col-start-1">
            <Typography
              variant="h2"
              className="leading-0 text-center font-serif font-bold text-theme xl:text-left"
            >
              Boxing Day
            </Typography>

            <Typography
              variant="h2"
              className="leading-0 text-center font-serif font-bold xl:text-left"
            >
              in Summer
            </Typography>
          </div>

          <div className="col-start-1 grid place-content-center xl:col-start-2 xl:row-span-3">
            <img
              className=""
              src="/images/computing-20230803-feature-fg-bdis-computers-tablets-and-accessories-m.webp"
            />
          </div>

          <div className="col-start-1">
            <Typography
              variant="h2"
              className="leading-0 text-center font-serif xl:text-left"
            >
              Get hot summer deals on select computers, tablets, accessories,
              and more.
            </Typography>
          </div>
          <div className="col-start-1 text-center xl:text-left">
            <Button size="lg" className="bg-theme">
              Shop Deals
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

const CallToAction2 = () => {
  const swiperSlide = useSwiperSlide()

  return (
    <div className="flex items-center bg-gradient-to-b from-[#0044bf] to-[#2db7d6] py-12 xl:py-24">
      <div
        className={`container transition-transform duration-[4000ms] ${
          swiperSlide.isActive ? "xl:translate-x-0" : "xl:translate-x-24"
        }`}
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-8 xl:grid-cols-2 xl:gap-y-4">
          <div className="col-start-1">
            <Typography
              variant="h2"
              className="leading-0 text-center font-serif font-bold text-white xl:text-left"
            >
              Back to <span className="text-accent">School</span>
            </Typography>
          </div>

          <div className="col-start-1 grid place-content-center xl:col-start-2 xl:row-span-3">
            <img
              className=""
              src="/images/computing-20230811-feature-bts-computers-tablets-and-accessories-m.webp"
            />
          </div>

          <div className="col-start-1">
            <Typography
              variant="h2"
              className="leading-0 text-center font-serif text-white xl:text-left"
            >
              Save big on select computers and productivity essentials.
            </Typography>
            <Typography
              className="mt-6 text-center font-serif text-white xl:text-left"
              variant="h6"
            >
              Pack the latest gear and start your year off right.
            </Typography>
          </div>
          <div className="col-start-1 text-center xl:text-left">
            <Button className="bg-white text-theme" size="lg">
              Shop Deals
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
