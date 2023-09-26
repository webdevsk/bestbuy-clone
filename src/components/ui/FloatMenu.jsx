import {
  autoUpdate,
  flip,
  offset,
  shift,
  size,
  useClick,
  useDismiss,
  useFloating,
  useHover,
  useInteractions,
  useTransitionStyles,
} from "@floating-ui/react"
import React, { forwardRef, useState } from "react"

// This is the brain of the component tree. Both FloatHandler and FloatElement has to be inside a FloatMenu for this to work
const FloatMenu = ({
  children,
  defaultOpen = false,
  placement = "bottom-start",
  whenClicked,
  whenHovered,
  whenDismissed,
  transition,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  const { refs, floatingStyles, context } = useFloating({
    // elements: { reference: anchor, floating: anker },
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: placement,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(10),
      size({
        apply({ availableHeight, elements }) {
          Object.assign(elements.floating.style, {
            height: `${availableHeight}px`,
          })
        },
      }),
      shift(true),
      flip(true),
    ],
  })

  const { isMounted, styles } = useTransitionStyles(context)
  const { getReferenceProps, getFloatingProps } = useInteractions([
    useClick(context),
    useDismiss(context),
  ])

  return React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return
    const component = {
      FloatHandler: React.cloneElement(child, {
        ref: refs.setReference,
        ...getReferenceProps(),
      }),
      FloatElement: React.cloneElement(child, {
        ref: refs.setFloating,
        open: transition ? isMounted : isOpen,
        style: transition
          ? { ...floatingStyles, ...styles }
          : { ...floatingStyles },
        ...getFloatingProps(),
      }),
      default: child,
    }
    return component[child.type.displayName ?? "default"]
  })
}

export { FloatMenu }

// Component that triggers isOpen
const FloatHandler = forwardRef((props, ref) => (
  <button ref={ref} {...props}></button>
))

FloatHandler.displayName = "FloatHandler"
export { FloatHandler }

// Component that renders when isOpen is True
const FloatElement = forwardRef(
  (props, ref) => props.open && <div ref={ref} {...props}></div>,
)
FloatElement.displayName = "FloatElement"
export { FloatElement }
