import { Typography } from "@material-tailwind/react"
import { FloatingOverlay, FloatingPortal, size } from "@floating-ui/react"
import { Float } from "@headlessui-float/react"
import { Popover, Transition } from "@headlessui/react"
import { Fragment, useState } from "react"
import { HiChevronLeft, HiChevronRight } from "react-icons/hi"
import { Link } from "react-router-dom"
import { useMainMenuContext } from "../contexts/MainMenuContext"
import { useHeaderMenuContext } from "../contexts/HeaderMenuContext"

const BurgerMenu = () => {
  return (
    <Popover className="relative grid place-items-center">
      <Float
        portal={true}
        shift
        offset={16}
        arrow={0}
        placement="bottom"
        transform={false}
        middleware={[
          size({
            apply({ availableHeight, availableWidth, elements }) {
              Object.assign(elements.floating.style, {
                width: `${availableWidth}px`,
                height: `${availableHeight}px`,
              })
            },
          }),
        ]}
        enter="transition duration-200 ease-out"
        enterFrom="opacity-0 scale-y-90"
        enterTo="scale-y-100 opacity-100"
        leave="transition duration-200 ease-in"
        leaveFrom="scale-y-100 opacity-100"
        leaveTo="scale-y-90 opacity-0"
        originClass="origin-top"
        floatingAs={Fragment}
      >
        <Popover.Button className="relative [--_stroke-height:0.2em] [--_stroke-width:1.5em] focus-visible:outline-none">
          <BurgerMenuBtn />
        </Popover.Button>

        <Popover.Panel className="pointer-events-none">
          <Float.Arrow className="absolute h-5 w-5 rotate-45 border border-gray-200 bg-white" />
          <FloatingPortal>
            <FloatingOverlay lockScroll />
          </FloatingPortal>
          <div className="pointer-events-auto relative h-full overflow-x-hidden overflow-y-scroll  border border-t-transparent bg-gray-100 text-body">
            <BurgerMenuList />
          </div>
        </Popover.Panel>
      </Float>
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
              <Typography className="text-base capitalize">
                {menu.label}
              </Typography>
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
                  <Typography className="text-base font-bold text-theme">
                    Back
                  </Typography>
                </button>
                {menu.items.map((item) => (
                  <Link
                    className="block p-3 transition-colors hover:bg-gray-100 hover:text-theme"
                    key={item}
                    to={item}
                  >
                    <Typography className="text-base capitalize">
                      {item}
                    </Typography>
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
            <Link to="#" className="block p-3">
              <Typography className="text-base">{menu.label}</Typography>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}
