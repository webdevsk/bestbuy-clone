import { Link } from "react-router-dom"
import SearchBar from "./SearchBar"
import MainMenuContext from "../../contexts/MainMenuContext"
import HeaderMenuContext from "../../contexts/HeaderMenuContext"
import { HeaderToolBar } from "./HeaderToolBar"
import { MainMenuDesktop } from "./MainMenuDesktop"
import { useSelector } from "react-redux"
import {
  selectProductBrands,
  selectProductCategories,
} from "../../features/api/apiSlice"
import { motion } from "framer-motion"
import StickyHeaderContext from "../../contexts/StickyHeaderContext"
import { useHeaderMenuContext } from "../../hooks/useHeaderMenuContext"
import useStickyHeader from "../../hooks/useStickyHeader"
import { MdOutlineShoppingBag } from "react-icons/md"

const Header = () => {
  const { isSticking, rerender, headerRef, fillerRef, headerStyles } =
    useStickyHeader({
      approxShrunkenHeight: 72,
      margin: 64,
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
      label: "Easy Buy Business",
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
            className={`relative z-50 grid w-full grid-cols-[1fr_auto_1fr] text-white shadow-lg ${
              !isSticking
                ? "grid-rows-[repeat(3,_min-content)] bg-theme shadow-transparent"
                : "grid-rows-[repeat(1,_min-content)] bg-[#003da6] shadow-black/30"
            }`}
            style={headerStyles}
          >
            <div
              className={`container col-span-full row-span-full mb-0 grid grid-cols-[repeat(12,_minmax(max-content,_1fr))] grid-rows-[subgrid] items-center gap-x-2 lg:gap-x-4 `}
            >
              <div
                className={`absolute inset-0 col-[1/-1] row-[-2/-1] bg-[#003da6] ${
                  isSticking ? "hidden" : "block"
                }`}
              ></div>

              <HeaderMenu
                className={`col-[2/-1] row-span-1 flex-wrap justify-end gap-3 py-3 ${
                  isSticking ? "hidden" : "hidden lg:flex"
                }`}
              />

              <SiteLogo
                className={`items-end gap-1 py-3 ${
                  isSticking
                    ? "col-[1/2] row-[1/2] hidden lg:flex"
                    : "col-[1/2] row-[2/3] flex"
                }`}
              />

              <SearchBar
                className={`my-2 ${
                  isSticking
                    ? "col-[1/-3] row-[3/4] lg:col-[2/7] lg:row-[1/2]"
                    : "col-[1/-1] row-[3/4] lg:col-[2/7] lg:row-[2/3]"
                }`}
              />

              <HeaderToolBar
                className={`${
                  isSticking
                    ? "col-[-3/-1] row-[3/4] lg:row-[1/2] xl:col-[-3/-1]"
                    : "col-[-3/-1] row-[2/3] lg:col-[-3/-1]"
                }`}
              />

              <MainMenuDesktop
                className={`col-[1/-1] row-[3/4] flex-wrap gap-2 py-3 ${
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
      <div className="grid grid-cols-2 place-content-center">
        <img src="/images/logo.png" alt="" width="40" className="row-span-2" />
        <div className="font-serif text-xl font-semibold leading-none antialiased">
          Easy
        </div>
        <div className="font-serif text-xl font-semibold leading-none antialiased">
          Buy
        </div>
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
