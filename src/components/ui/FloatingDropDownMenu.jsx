import IconDownLine from "./IconDownLine"
import { Typography } from "@material-tailwind/react"
import { useRef, useState } from "react"
import {
  useClick,
  useFloating,
  useInteractions,
  autoUpdate,
  useDismiss,
  useTransitionStyles,
  arrow,
  FloatingArrow,
  offset,
  size,
  FloatingOverlay,
  shift,
  FloatingPortal,
} from "@floating-ui/react"

const FloatingDropDownMenu = ({ buttonLabel, children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const arrowRef = useRef(null)

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: "bottom-start",
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(16),
      size({
        apply({ availableHeight, elements }) {
          Object.assign(elements.floating.style, {
            height: `${availableHeight}px`,
          })
        },
      }),
      shift(),
      arrow({ element: arrowRef }),
    ],
  })

  const { isMounted, styles } = useTransitionStyles(context)
  const { getReferenceProps, getFloatingProps } = useInteractions([
    useClick(context),
    useDismiss(context),
  ])

  return (
    <>
      <button
        ref={refs.setReference}
        {...getReferenceProps()}
        className="group flex gap-1 hover:text-accent focus-visible:outline-none"
      >
        <Typography variant="h6">{buttonLabel}</Typography>
        <IconDownLine open={isOpen} className="h-4 w-4"></IconDownLine>
      </button>

      {isMounted && (
        <>
          <div
            ref={refs.setFloating}
            {...getFloatingProps()}
            style={{ ...floatingStyles, ...styles }}
          >
            <div
              className={`max-h-full w-80  overflow-y-scroll border border-t-transparent bg-white p-4 text-black`}
            >
              {children}
            </div>
            <FloatingArrow
              className="fill-white"
              ref={arrowRef}
              context={context}
              height={10}
              width={20}
              staticOffset={"10px"}
            />
          </div>
          <FloatingPortal>
            <FloatingOverlay
              key="mainMenuOverlay"
              lockScroll
              className={`absolute z-10 bg-black/20`}
            ></FloatingOverlay>
          </FloatingPortal>
        </>
      )}
    </>
  )
}

export default FloatingDropDownMenu
