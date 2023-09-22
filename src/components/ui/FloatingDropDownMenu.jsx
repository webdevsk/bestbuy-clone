import { autoUpdate, useFloating } from "@floating-ui/react-dom"
import IconDownLine from "./IconDownLine"
import { Typography } from "@material-tailwind/react"
import { Popover } from "@headlessui/react"

const FloatingDropDownMenu = ({ buttonLabel, children }) => {
  const { refs, floatingStyles } = useFloating({
    placement: "bottom-start",
    whileElementsMounted: autoUpdate,
    middleware: [],
  })
  return (
    <Popover>
      {({ open }) => (
        <>
          <Popover.Button
            ref={refs.setReference}
            className="group flex gap-1 hover:text-accent focus-visible:outline-none"
          >
            <Typography variant="h6">{buttonLabel}</Typography>
            <IconDownLine open={open} className="h-4 w-4"></IconDownLine>
          </Popover.Button>
          <Popover.Overlay className="fixed inset-0 z-10 bg-black opacity-30 transition-colors" />
          <Popover.Panel
            ref={refs.setFloating}
            style={floatingStyles}
            className=" z-50 w-64 border bg-white p-4 text-black"
          >
            {children}
          </Popover.Panel>
        </>
      )}
    </Popover>
  )
}

export default FloatingDropDownMenu
