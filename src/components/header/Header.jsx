import { Typography } from "@material-tailwind/react"
import { Link } from "react-router-dom"
import SearchBar from "./SearchBar"
import { useRef, useState } from "react"
import MainMenuContext from "../../contexts/MainMenuContext"
import HeaderMenuContext from "../../contexts/HeaderMenuContext"
import { Desktop, Mobile } from "../common/ReactResponsive"
import { HeaderToolBar } from "./HeaderToolBar"
import { MainMenuDesktop } from "./MainMenuDesktop"
import { TopMiniMenuDesktop } from "./TopMiniMenuDesktop"
import { useSelector } from "react-redux"
import {
  selectProductBrands,
  selectProductCategories,
} from "../../features/api/apiSlice"
import { useMediaQuery } from "react-responsive"
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion"

const Header = () => {
  const [isSticking, setIsSticking] = useState(false)
  const isDesktop = useMediaQuery({ minWidth: 960 })
  const { scrollY } = useScroll()

  const headerRef = useRef(null)
  const stickyHeaderRef = useRef(null)
  const headerHeight = headerRef.current?.getBoundingClientRect().height ?? 0
  const stickyHeaderHeight =
    stickyHeaderRef.current?.getBoundingClientRect().height ?? 0

  const scrollPastHeader = useTransform(() =>
    Math.max(scrollY.get() - headerHeight, 0),
  )

  const stickyHeaderY = useTransform(
    scrollPastHeader,
    [0, stickyHeaderHeight],
    [-stickyHeaderHeight, 0],
  )

  const stickyHeaderSpringY = useSpring(stickyHeaderY, {
    mass: 0.3,
  })
  useMotionValueEvent(scrollPastHeader, "change", (latest) => {
    setIsSticking(latest > 0)
  })

  const mainMenu = [
    {
      id: 1,
      label: "Brands",
      items: useSelector((state) => selectProductBrands(state)),
    },
    {
      id: 2,
      label: "Categories",
      items: useSelector((state) => selectProductCategories(state)),
    },
  ]

  const headerMenu = [
    {
      id: 1,
      label: "All Products",
      link: "/shop",
    },
    {
      id: 2,
      label: "Order Status",
      link: "#",
    },
    {
      id: 3,
      label: "Best Buy Business",
      link: "#",
    },
  ]

  return (
    <MainMenuContext.Provider value={mainMenu}>
      <HeaderMenuContext.Provider value={headerMenu}>
        <div id="header" ref={headerRef} className="group/header relative z-50">
          <section className="mb-0 bg-theme text-white lg:pb-2 lg:pt-4">
            <div className="flex flex-col">
              <TopMiniMenuDesktop />
              {/* placeholder */}
              <div className="relative h-16">
                <motion.div
                  ref={stickyHeaderRef}
                  style={{
                    position: isSticking ? "fixed" : "absolute",
                    top: 0,
                    y: isSticking ? stickyHeaderSpringY : 0,
                  }}
                  className={`inset-x-0 z-[9999] grid h-16 place-items-center shadow-lg transition-shadow ${
                    isSticking
                      ? "bg-theme shadow-black/30 duration-1000"
                      : "shadow-transparent duration-0"
                  }`}
                >
                  <div className="container flex flex-wrap items-center gap-x-4">
                    <Desktop>
                      <SiteLogo />
                    </Desktop>
                    <Mobile>
                      <AnimatePresence>
                        {!isSticking && <SiteLogo />}
                        {isSticking && (
                          <div className="w-1 grow">
                            <SearchBar />
                          </div>
                        )}
                      </AnimatePresence>
                    </Mobile>
                    <Desktop>
                      <div className="w-full lg:w-96">
                        <SearchBar />
                      </div>
                    </Desktop>

                    <HeaderToolBar />
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
          <a href="#pinned-product" className="skip">
            Skip to main content
          </a>
          <section className="mb-0 bg-[#003da6] py-2 text-white">
            <div className="container">
              <Mobile>
                <AnimatePresence>
                  {!isSticking ? (
                    <div className="w-full lg:w-96">
                      <SearchBar />
                    </div>
                  ) : (
                    <div className="h-10"></div>
                  )}
                </AnimatePresence>
              </Mobile>
              <Desktop>
                <MainMenuDesktop />
              </Desktop>
            </div>
          </section>
        </div>
      </HeaderMenuContext.Provider>
    </MainMenuContext.Provider>
  )
}

export default Header

const SiteLogo = () => (
  <motion.div
    initial={{ x: "-100%" }}
    animate={{ x: "0%" }}
    transition={{ type: "spring", mass: 0.1 }}
    className="-mt-2"
  >
    <Link to="/" className="flex items-end gap-1">
      <img src="/images/logo.png" alt="" width="48" />
      <div className="-mb-1">
        <Typography
          variant="h3"
          className="font-serif leading-none lg:leading-none"
        >
          Best
        </Typography>
        <Typography
          variant="h3"
          className="font-serif leading-none lg:leading-none"
        >
          Buy
        </Typography>
      </div>
    </Link>
  </motion.div>
)
