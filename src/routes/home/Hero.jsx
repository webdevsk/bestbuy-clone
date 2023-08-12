import { Button, Typography } from "@material-tailwind/react";
import { useRef, useEffect } from "react";
import { register } from "swiper/element/bundle";

register();

const Hero = () => {
  const swiperElRef = useRef(null);

  useEffect(() => {
    // listen for Swiper events using addEventListener
    swiperElRef.current.addEventListener("progress", (e) => {
      const [swiper, progress] = e.detail;
    });

    swiperElRef.current.addEventListener("slidechange", (e) => {});
  }, []);

  return (
    <>
      <swiper-container
        ref={swiperElRef}
        slides-per-view="1"
        navigation="false"
        pagination="true"
        autoplay-duration="5000"
        allow-touch-move="false"
      >
        <swiper-slide>
          <CallToAction1 />
        </swiper-slide>

        <swiper-slide>
          <CallToAction2 />
        </swiper-slide>
      </swiper-container>
      <Typography>Hello</Typography>
    </>
  );
};

export default Hero;

const CallToAction1 = () => {
  return (
    <section className="flex min-h-screen items-center bg-gradient-to-b from-[#fcc31e] to-[#f9e319] xl:h-[500px] xl:min-h-fit">
      <div className="container">
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
              src="src/assets/images/computing-20230803-feature-fg-bdis-computers-tablets-and-accessories-m.webp"
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
    </section>
  );
};

const CallToAction2 = () => {
  return (
    <section className="flex min-h-screen items-center bg-gradient-to-b from-[#0044bf] to-[#2db7d6] xl:h-[500px] xl:min-h-fit">
      <div className="container">
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
              src="src/assets/images/computing-20230811-feature-bts-computers-tablets-and-accessories-m.webp"
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
    </section>
  );
};
