import { Typography } from "@material-tailwind/react"
import { Link } from "react-router-dom"
import { Fragment } from "react"
import { FloatingOverlay, FloatingPortal, size } from "@floating-ui/react"
import { Popover } from "@headlessui/react"
import { Float } from "@headlessui-float/react"
import { HiChevronDown } from "react-icons/hi"
import { useMainMenuContext } from "../../contexts/MainMenuContext"

export const MainMenuDesktop = () => {
  const mainMenu = useMainMenuContext()
  return (
    <Popover.Group as="ul" className="flex flex-wrap gap-2 py-2">
      {mainMenu.map((menu) => (
        <Popover className="relative" key={menu.id}>
          <Float
            offset={16}
            arrow={0}
            shift
            placement="bottom-start"
            transform={false}
            floatingAs={Fragment}
            middleware={[
              size({
                apply({ availableHeight, elements }) {
                  Object.assign(elements.floating.style, {
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
          >
            <Popover.Button className="group flex items-center gap-1 hover:text-accent focus-visible:outline-none">
              <Typography variant="h6" className="capitalize">
                {menu.label}
              </Typography>
              <HiChevronDown
                className={`h-5 w-5 transition ui-open:rotate-180`}
              />
            </Popover.Button>

            <Popover.Panel className="pointer-events-none [&>*]:pointer-events-auto">
              <Float.Arrow className="absolute h-5 w-5 rotate-45 border border-gray-200 bg-white" />
              <div
                className={`relative max-h-full w-80 overflow-y-scroll border border-t-transparent bg-white py-2 text-black`}
              >
                {menu.items.map((item) => (
                  <li key={item}>
                    <Link
                      to={item}
                      className="block px-3 py-1 transition-colors hover:bg-gray-100 hover:text-theme"
                    >
                      <Typography className="text-base capitalize">
                        {item}
                      </Typography>
                    </Link>
                  </li>
                ))}
              </div>

              <FloatingPortal>
                <FloatingOverlay
                  lockScroll
                  className="pointer-events-none z-30 h-screen w-full bg-black/30"
                />
              </FloatingPortal>
            </Popover.Panel>
          </Float>
        </Popover>
      ))}
    </Popover.Group>
  )
}
