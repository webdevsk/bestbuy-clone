import { Typography } from "@material-tailwind/react"
import { FloatingOverlay, FloatingPortal, size } from "@floating-ui/react"
import { Float } from "@headlessui-float/react"
import { Popover } from "@headlessui/react"
import { Fragment } from "react"

const BurgerMenu = ({ mainMenu, topMiniMenu }) => {
  return (
    <Popover className="relative grid place-items-center">
      <Float
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
        <Popover.Button className="group relative [--_stroke-height:0.2em] [--_stroke-width:1.5em]">
          <BurgerMenuBtn />
        </Popover.Button>

        <Popover.Panel className="pointer-events-none">
          <Float.Arrow className="absolute h-5 w-5 rotate-45 border border-gray-200 bg-white" />
          <FloatingPortal>
            <FloatingOverlay lockScroll />
          </FloatingPortal>
          <div className="pointer-events-auto relative h-full overflow-y-scroll  border border-t-transparent bg-gray-100 text-body">
            <ul className="divide-y">
              {mainMenu?.map((menu) => (
                <li key={menu.id}>
                  <button className="pointer-events-auto block w-full bg-white p-3 text-start">
                    <Typography className="text-base">{menu.label}</Typography>
                  </button>
                </li>
              ))}
            </ul>
            <ul>
              {topMiniMenu?.map((menu) => (
                <li key={menu.id}>
                  <a href="#" className="block p-3">
                    <Typography className="text-base">{menu.label}</Typography>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Popover.Panel>
      </Float>
    </Popover>
  )
}

export default BurgerMenu

const BurgerMenuBtn = () => (
  <div className="relative flex transform overflow-hidden transition-all duration-200">
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
