import { Link } from "react-router-dom"
import SearchBar from "./SearchBar"
import { useRef, useState } from "react"
import MainMenuContext from "../../contexts/MainMenuContext"
import HeaderMenuContext from "../../contexts/HeaderMenuContext"
import { Desktop, Mobile } from "../common/ReactResponsive"
import { HeaderToolBar } from "./HeaderToolBar"
import { MainMenuDesktop } from "./MainMenuDesktop"
import { useSelector } from "react-redux"
import {
  selectProductBrands,
  selectProductCategories,
} from "../../features/api/apiSlice"
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion"
import StickyHeaderContext from "../../contexts/StickyHeaderContext"
import { useHeaderMenuContext } from "../../hooks/useHeaderMenuContext"

const Header = () => {
  const [isSticking, setIsSticking] = useState(false)
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
    // setIsSticking(latest > 0)
    setIsSticking(0)
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
        <StickyHeaderContext.Provider value={isSticking}>
          {/* <div
            id="header"
            ref={headerRef}
            className="group/header relative z-50"
          >
            {/* <section className="mb-0 bg-theme text-white lg:pb-2 lg:pt-4">
              <div className="flex flex-col">
                <HeaderMenu />
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
                              <SearchBar
                                layoutId="search-bar"
                                key="search-bar"
                              />
                            </div>
                          )}
                        </AnimatePresence>
                      </Mobile>
                      <Desktop>
                        <div className="w-full lg:w-96">
                          <SearchBar key="search-bar" />
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
                        <SearchBar layoutId="search-bar" />
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
          </div> */}
          {/* <div className="mb-12"></div> */}

          <div
            id="header"
            ref={headerRef}
            className={`relative grid grid-cols-[1fr_repeat(12,_minmax(max-content,_1fr))_1fr] gap-x-2 bg-theme text-white ${
              isSticking
                ? "grid-rows-[repeat(1,_min-content)]"
                : "grid-rows-[repeat(3,_min-content)]"
            }`}
          >
            <section
              className={`container col-[2/-2] col-start-2 row-span-full mb-0 grid grid-cols-[subgrid] grid-rows-[subgrid] items-center xl:gap-x-4 `}
            >
              <div
                className={`absolute inset-0 col-[1/-1] row-[-2/-1] bg-[#003da6] ${
                  isSticking ? "hidden" : "block"
                }`}
              ></div>
              <HeaderMenu
                className={`col-[2/14] row-span-1 flex-wrap justify-end gap-3 py-2 ${
                  isSticking ? "hidden" : "hidden xl:flex"
                }`}
              />

              <SiteLogo
                className={`-translate-y-1 items-end gap-1 py-3 ${
                  isSticking
                    ? "col-[1/2] row-[1/2] hidden xl:flex"
                    : "col-[1/2] row-[2/3] flex"
                }`}
              />

              <SearchBar
                layoutId="search-bar"
                className={`my-2 ${
                  isSticking
                    ? "col-[1/11] row-[3/4] xl:col-[2/6] xl:row-[1/2]"
                    : "col-[1/-1] row-[3/4] xl:col-[2/6] xl:row-[2/3]"
                }`}
              />

              <HeaderToolBar
                className={`ms-auto ${
                  isSticking
                    ? "col-[11/13] row-[3/4] xl:row-[1/2]"
                    : "col-[11/13] row-[2/3]"
                }`}
              />

              <MainMenuDesktop
                className={`col-[1/-1] row-[3/4] flex-wrap gap-2 py-2 ${
                  isSticking ? "hidden" : "hidden xl:flex"
                }`}
              />
            </section>

            <a href="#pinned-product" className="skip">
              Skip to main content
            </a>
          </div>
        </StickyHeaderContext.Provider>
      </HeaderMenuContext.Provider>
    </MainMenuContext.Provider>
  )
}

export default Header

const SiteLogo = ({ className }) => {
  return (
    <Link to="/" className={className}>
      <img src="/images/logo.png" alt="" width="48" />
      <div className="">
        <h3 className="font-serif leading-none lg:leading-none">Best</h3>
        <h3 className="font-serif leading-none lg:leading-none">Buy</h3>
      </div>
    </Link>
  )
}

const HeaderMenu = ({ className }) => {
  const headerMenuItems = useHeaderMenuContext()
  return (
    <div className={className}>
      {headerMenuItems?.map((menu, i) => (
        <Link key={i} to={menu.link} className="hover:underline">
          <small>{menu.label}</small>
        </Link>
      ))}
    </div>
  )
}
