import { Button, Typography } from '@material-tailwind/react'

const Hero = () => {
  return (
    <section className="bg-gradient-to-b from-[#fcc31e] to-[#f9e319]">
      <div className="container py-24">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-8 gap-y-8 xl:gap-y-4">
          <div className="col-start-1">
            <Typography
              variant="h2"
              className="font-serif text-theme leading-0 font-bold text-center xl:text-left xl:text-3xl"
            >
              Boxing Day
            </Typography>

            <Typography
              variant="h2"
              className="font-serif font-bold leading-0 text-center xl:text-left xl:text-3xl"
            >
              in Summer
            </Typography>
          </div>

          <div className="col-start-1 xl:col-start-2 xl:row-span-4 grid place-content-center">
            <img
              className=""
              src="src/assets/images/computing-20230803-feature-fg-bdis-computers-tablets-and-accessories-m.webp"
            />
          </div>

          <div className="col-start-1">
            <Typography
              variant="h2"
              className="font-serif leading-0 text-center xl:text-left"
            >
              Get hot summer deals on select computers, tablets, accessories,
              and more.
            </Typography>
          </div>
          <div className="col-start-1 text-center xl:text-left">
            <Button size="lg">Shop Deals</Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
