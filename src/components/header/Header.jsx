import { Link } from "react-router-dom"
import SearchBar from "./SearchBar"
import { useEffect, useRef, useState } from "react"
import MainMenuContext from "../../contexts/MainMenuContext"
import HeaderMenuContext from "../../contexts/HeaderMenuContext"
import { HeaderToolBar } from "./HeaderToolBar"
import { MainMenuDesktop } from "./MainMenuDesktop"
import { useSelector } from "react-redux"
import {
  selectProductBrands,
  selectProductCategories,
} from "../../features/api/apiSlice"
import {
  motion,
  useMotionValue,
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
  const fillerRef = useRef(null)
  const headerOgHeight = useRef(0)
  // Delaying the appearance of sticky header by 64px
  // Giving the page enough time to change layout and getting
  // the shrunken header height
  const margin = 64

  // We can't get the height of the shrunken header until
  // isSticky is true AND it re-renders with the changed layout.
  // So theres a bit of a delay between isSticky getting true
  // (position sticking) and the shrunken height getting populated
  // If we use the initial value of 0, it will cause a sudden
  // drop in tranlateY. going from -0 to -100 (shrunken height)
  // So its better to use a maximum possible shrunken height here
  // to reduce the drop distance. Just use Desktop shrunken mode size
  // It doesnt have to be accurate. Just a near value would do
  const headerShrunkenHeight = useRef(72) //72 will be -72px initially in translateY

  useEffect(() => {
    if (isSticking) {
      headerShrunkenHeight.current =
        headerRef.current?.getBoundingClientRect().height
    } else {
      // Set filler height
      const headerHeight = headerRef.current.getBoundingClientRect().height
      headerOgHeight.current = headerHeight
      fillerRef.current.style.height = headerHeight + "px"
    }
  }, [headerRef, fillerRef, isSticking])

  const scrollPastHeader = useMotionValue(0)
  useMotionValueEvent(scrollY, "change", (latest) => {
    // calculating how much we've scrolled past the og header
    // using min max to avoid unnecessary re-renders
    // re-renders only when scrollPastHeader is between 0 and headerOgHeight
    scrollPastHeader.set(
      Math.max(
        Math.min(
          latest - headerOgHeight.current,
          headerOgHeight.current + margin,
        ),
        0,
      ),
    )
    // set sticking state if we've scrolled past the og header
    setIsSticking(scrollPastHeader.get() > 0)
  })

  const stickyHeaderY = useTransform(
    scrollPastHeader,
    [0, headerShrunkenHeight.current + margin],
    [-(headerShrunkenHeight.current + margin), 0],
  )

  const stickyHeaderSpringY = useSpring(stickyHeaderY, {
    mass: 0.3,
  })

  useEffect(() => {
    const reset = () => {
      // To reanimate appearance | Causing stickyHeaderY getting negative initial value
      scrollPastHeader.set(0)
      // To recalculate headerOgHeight
      setIsSticking(false)
    }
    addEventListener("resize", reset)
    return () => removeEventListener("resize", reset)
  }, [scrollPastHeader])

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
          <div ref={fillerRef} className="filler bg-[#003da6]"></div>
          <motion.section
            id="header"
            ref={headerRef}
            className={`relative z-50 grid w-full grid-cols-[1fr_repeat(12,_minmax(max-content,_1fr))_1fr] gap-x-2 bg-theme text-white ${
              isSticking
                ? "grid-rows-[repeat(1,_min-content)]"
                : "grid-rows-[repeat(3,_min-content)]"
            }`}
            style={{
              position: isSticking ? "fixed" : "absolute",
              top: 0,
              y: isSticking ? stickyHeaderSpringY : 0,
            }}
          >
            <div
              className={`container col-[2/-2] row-span-full mb-0 grid grid-cols-[subgrid] grid-rows-[subgrid] items-center px-0 lg:gap-x-4 `}
            >
              <div
                className={`absolute inset-0 col-[1/-1] row-[-2/-1] bg-[#003da6] ${
                  isSticking ? "hidden" : "block"
                }`}
              ></div>
              <HeaderMenu
                className={`col-[2/14] row-span-1 flex-wrap justify-end gap-3 py-2 ${
                  isSticking ? "hidden" : "hidden lg:flex"
                }`}
              />

              <SiteLogo
                className={`-translate-y-1 items-end gap-1 py-3 ${
                  isSticking
                    ? "col-[1/2] row-[1/2] hidden lg:flex"
                    : "col-[1/2] row-[2/3] flex"
                }`}
              />

              <SearchBar
                className={`my-2 ${
                  isSticking
                    ? "col-[1/10] row-[3/4] lg:col-[2/6] lg:row-[1/2]"
                    : "col-[1/-1] row-[3/4] lg:col-[2/6] lg:row-[2/3]"
                }`}
              />

              <HeaderToolBar
                className={`ms-auto ${
                  isSticking
                    ? "col-[10/-1] row-[3/4] lg:row-[1/2] xl:col-[3/-1]"
                    : "col-[3/-1] row-[2/3] lg:col-[9/-1]"
                }`}
              />

              <MainMenuDesktop
                className={`col-[1/-1] row-[3/4] flex-wrap gap-2 py-2 ${
                  isSticking ? "hidden" : "hidden lg:flex"
                }`}
              />
            </div>

            <a href="#pinned-product" className="skip">
              Skip to main content
            </a>
          </motion.section>
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
