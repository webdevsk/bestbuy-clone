import { Typography } from "@material-tailwind/react"
import { Link } from "react-router-dom"
import SearchBar from "./SearchBar"
import { useEffect, useRef, useState } from "react"
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

const Header = () => {
  const headerRef = useRef(null)
  const stickyHeaderRef = useRef(null)
  const [isSticking, setIsSticking] = useState(false)

  const isDesktop = useMediaQuery({ minWidth: 960 })

  useEffect(() => {
    // Amount of pixels after the floating should start
    const distance = headerRef.current.getBoundingClientRect().height

    const handleScroll = () => {
      const height = stickyHeaderRef.current.getBoundingClientRect().height
      //if header is visible
      const isFloating = distance < scrollY

      //Calculation:
      // Initially hide itself completely. As in translateY: -100% or bottom: 100%
      // (scrollY - distance) The amount scrolled minus the main header height. So initially it is 0 after scrolling past header container
      // Keep increasing translateY as the scrollY-distance value increases. Stops at translateY: 0%. Now the sticky header is completely visible
      const offset = -height + (scrollY - distance)

      setIsSticking(isFloating)
      headerRef.current.classList.toggle("floating", isFloating)
      stickyHeaderRef.current.style.position = isFloating ? "fixed" : "absolute"
      stickyHeaderRef.current.style.top = `${
        isFloating && offset < 0 ? offset : 0
      }px`
    }

    addEventListener("scroll", handleScroll)
    return () => removeEventListener("scroll", handleScroll)
  }, [stickyHeaderRef, headerRef, isDesktop])

  const mainMenu = [
    {
      id: 1,
      label: "Shop",
      items: ["All Products", "Dress", "Phones"],
    },
    {
      id: 2,
      label: "Brands",
      items: useSelector((state) => selectProductBrands(state)),
    },
    {
      id: 3,
      label: "Categories",
      items: useSelector((state) => selectProductCategories(state)),
    },
  ]

  const headerMenu = [
    {
      id: 1,
      label: "Order Status",
      link: "#",
    },
    {
      id: 2,
      label: "Blog",
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
                <div
                  ref={stickyHeaderRef}
                  className={`absolute inset-x-0 z-[9999] grid h-16 place-items-center shadow-lg transition-shadow ${
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
                      {!isSticking && <SiteLogo />}
                      {isSticking && (
                        <div className="w-1 grow">
                          <SearchBar />
                        </div>
                      )}
                    </Mobile>
                    <Desktop>
                      <div className="w-full lg:w-96">
                        <SearchBar />
                      </div>
                    </Desktop>

                    <HeaderToolBar />
                  </div>
                </div>
              </div>
            </div>
          </section>
          <a href="#pinned-product" className="skip">
            Skip to main content
          </a>
          <section className="mb-0 bg-[#003da6] py-2 text-white">
            <div className="container">
              <Mobile>
                {!isSticking ? (
                  <div className="w-full lg:w-96">
                    <SearchBar />
                  </div>
                ) : (
                  <div className="h-10"></div>
                )}
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
  <div className="-mt-2">
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
  </div>
)
