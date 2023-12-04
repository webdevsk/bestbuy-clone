import { Popover, Transition } from "@headlessui/react"
import { useState } from "react"
import { HiChevronLeft, HiChevronRight } from "react-icons/hi"
import { Link } from "react-router-dom"
import { useMainMenuContext } from "../../hooks/useMainMenuContext"
import { useHeaderMenuContext } from "../../hooks/useHeaderMenuContext"
import { HigherOrderFloat, HigherOrderPanel } from "../common/HigherOrderFloat"

const BurgerMenu = () => {
  return (
    <Popover className="relative grid place-items-center">
      <HigherOrderFloat placement="bottom" strategy="fixed">
        <Popover.Button className="relative [--_stroke-height:0.2em] [--_stroke-width:1.5em] focus-visible:outline-none">
          <BurgerMenuBtn />
        </Popover.Button>

        <HigherOrderPanel fullHeight fullWidth lockScroll>
          <BurgerMenuList />
        </HigherOrderPanel>
      </HigherOrderFloat>
    </Popover>
  )
}

export default BurgerMenu

const BurgerMenuBtn = (props) => (
  <div
    {...props}
    className={`${props.className} relative flex transform overflow-hidden transition-all duration-200`}
  >
    <div className="flex h-5  w-[--_stroke-width] origin-center transform flex-col gap-1 overflow-hidden transition-all duration-300">
      <div className="h-[--_stroke-height] w-[--_stroke-width] origin-left transform rounded bg-white transition-all duration-300 ui-open:translate-x-10"></div>
      <div className="h-[--_stroke-height] w-[--_stroke-width] transform rounded bg-white transition-all delay-75 duration-300 ui-open:translate-x-10"></div>
      <div className="h-[--_stroke-height] w-[--_stroke-width] origin-left transform rounded bg-white transition-all delay-150 duration-300 ui-open:translate-x-10"></div>

      <div className="absolute top-2.5 flex w-0 -translate-x-10 transform items-center justify-between transition-all duration-500 ui-open:w-12 ui-open:translate-x-0 [&>*]:h-[--_stroke-height] [&>*]:w-[--_stroke-width]">
        <div className="absolute h-[--_stroke-height] w-[--_stroke-width] rotate-0 transform rounded bg-white transition-all delay-300 duration-500 ui-open:rotate-45"></div>
        <div className="absolute h-[--_stroke-height] w-[--_stroke-width] -rotate-0 transform rounded bg-white transition-all delay-300 duration-500 ui-open:-rotate-45"></div>
      </div>
    </div>
  </div>
)

const BurgerMenuList = () => {
  const mainMenu = useMainMenuContext()
  const headerMenu = useHeaderMenuContext()
  const [subMenu, setSubMenu] = useState(null)
  return (
    <>
      <ul className="divide-y">
        {mainMenu?.map((menu) => (
          <li key={menu.id}>
            <button
              className="pointer-events-auto flex w-full items-center justify-between bg-white p-3 text-start"
              onClick={() => setSubMenu(menu.id)}
            >
              <p className="text-base capitalize">{menu.label}</p>
              {menu.items && menu.items.length !== 0 && (
                <HiChevronRight className="h-5 w-5 align-middle text-gray-800" />
              )}
            </button>
            {menu.items && menu.items.length !== 0 && (
              <Transition
                show={subMenu === menu.id}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
                className="absolute inset-0 divide-y overflow-y-auto bg-white"
              >
                <button
                  className="sticky top-0 flex w-full items-center gap-2 bg-inherit p-3"
                  onClick={() => setSubMenu(null)}
                >
                  <HiChevronLeft className="h-5 w-5 align-middle text-gray-800" />
                  <p className="text-base font-bold text-theme">Back</p>
                </button>
                {menu.items?.map((item) => (
                  <Link
                    className="block p-3 transition-colors hover:bg-gray-100 hover:text-theme"
                    key={item}
                    to={item}
                  >
                    <p className="text-base capitalize">{item}</p>
                  </Link>
                ))}
              </Transition>
            )}
          </li>
        ))}
      </ul>
      <ul>
        {headerMenu?.map((menu) => (
          <li key={menu.id}>
            <Link to={menu.link} className="block p-3">
              <p className="text-base">{menu.label}</p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}
