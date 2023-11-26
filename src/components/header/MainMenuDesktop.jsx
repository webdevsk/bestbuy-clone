import { Link } from "react-router-dom"
import { Popover } from "@headlessui/react"
import { HiChevronDown } from "react-icons/hi"
import { useMainMenuContext } from "../../hooks/useMainMenuContext"
import { HigherOrderFloat, HigherOrderPanel } from "../common/HigherOrderFloat"

export const MainMenuDesktop = () => {
  const mainMenu = useMainMenuContext()
  return (
    <Popover.Group as="ul" className="flex flex-wrap gap-2 py-2">
      {mainMenu?.map((menu) => (
        <Popover className="relative" key={menu.id}>
          <HigherOrderFloat placement="bottom-start">
            <Popover.Button className="group flex items-center gap-1 hover:text-accent focus-visible:outline-none">
              <h6 className="capitalize">{menu.label}</h6>
              <HiChevronDown
                className={`h-5 w-5 transition ui-open:rotate-180`}
              />
            </Popover.Button>

            <HigherOrderPanel
              lockScroll
              containerProps={{ className: "w-80 divide-y overflow-y-scroll" }}
            >
              {menu.items?.map((item, i) => (
                <li key={i}>
                  <Link
                    to={item}
                    className="block px-3 py-2 transition-colors hover:bg-gray-200 hover:text-theme"
                  >
                    <p className="text-base capitalize">{item}</p>
                  </Link>
                </li>
              ))}
            </HigherOrderPanel>
          </HigherOrderFloat>
        </Popover>
      ))}
    </Popover.Group>
  )
}
