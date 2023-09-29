import { Typography } from "@material-tailwind/react"
import { FloatElement, FloatHandler, FloatMenu } from "./ui/FloatMenu"
import { FloatingOverlay, FloatingPortal } from "@floating-ui/react"
import { forwardRef } from "react"
const BurgerMenu = ({ mainMenu, topMiniMenu }) => {
  return (
    <FloatMenu
      click
      dismiss
      transition
      shift
      offset={8}
      size
      arrow={{ fill: "white", width: 20, height: 10 }}
      placement="bottom"
    >
      <FloatHandler>
        <BurgerMenuBtn />
      </FloatHandler>

      <FloatElement className="w-screen">
        <FloatingPortal>
          <FloatingOverlay lockScroll />
        </FloatingPortal>
        <div className=" h-full overflow-y-auto border border-t-transparent bg-gray-100 text-body">
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
      </FloatElement>
    </FloatMenu>
  )
}

export default BurgerMenu

const BurgerMenuBtn = forwardRef((props, ref) => (
  <button
    ref={ref}
    {...props}
    className="group relative [--_stroke-height:0.2em] [--_stroke-width:1.5em]"
  >
    <div className="relative flex transform overflow-hidden transition-all duration-200">
      <div className="flex h-5  w-[--_stroke-width] origin-center transform flex-col gap-1 overflow-hidden transition-all duration-300">
        <div className="h-[--_stroke-height] w-[--_stroke-width] origin-left transform rounded bg-white transition-all duration-300 group-open:translate-x-10"></div>
        <div className="h-[--_stroke-height] w-[--_stroke-width] transform rounded bg-white transition-all delay-75 duration-300 group-open:translate-x-10"></div>
        <div className="h-[--_stroke-height] w-[--_stroke-width] origin-left transform rounded bg-white transition-all delay-150 duration-300 group-open:translate-x-10"></div>

        <div className="absolute top-2.5 flex w-0 -translate-x-10 transform items-center justify-between transition-all duration-500 group-open:w-12 group-open:translate-x-0 [&>*]:h-[--_stroke-height] [&>*]:w-[--_stroke-width]">
          <div className="absolute h-[--_stroke-height] w-[--_stroke-width] rotate-0 transform rounded bg-white transition-all delay-300 duration-500 group-open:rotate-45"></div>
          <div className="absolute h-[--_stroke-height] w-[--_stroke-width] -rotate-0 transform rounded bg-white transition-all delay-300 duration-500 group-open:-rotate-45"></div>
        </div>
      </div>
    </div>
  </button>
))

BurgerMenuBtn.displayName = "BurgerMenuBtn"
