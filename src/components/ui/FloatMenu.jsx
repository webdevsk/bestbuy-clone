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
export const FloatMenu = ({
  children,
  distance = 0,
  autoFlip,
  click,
  hover,
  dismiss,
  autoShift,
  autoSize,
  defaultOpen = false,
  placement = "bottom-start",
  transition,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: placement,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(distance),
      autoSize &&
        size({
          apply({ availableHeight, elements }) {
            Object.assign(elements.floating.style, {
              height: `${availableHeight}px`,
            })
          },
        }),
      autoShift && shift(),
      autoFlip && flip(),
    ],
  })

  const { isMounted, styles } = useTransitionStyles(context)
  const { getReferenceProps, getFloatingProps } = useInteractions([
    click && UseClickHook(context),
    hover && UseHoverHook(context),
    dismiss && UseDismissHook(context),
  ])

  //Instead of calling the components directly, we loop through children, check if required components are present,
  //clone them while passing refs and other props
  //
  return React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return

    //This is just an alternative to Switch statement
    const component = {
      FloatHandler: React.cloneElement(child, {
        ref: refs.setReference,
        open: isOpen,
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

// Component that triggers isOpen
//
export const FloatHandler = forwardRef((props, ref) => (
  <button ref={ref} {...props}></button>
))
FloatHandler.displayName = "FloatHandler"

// Component that renders when isOpen is True
//
export const FloatElement = forwardRef(
  (props, ref) => props.open && <div ref={ref} {...props}></div>,
)
FloatElement.displayName = "FloatElement"

//Turning hooks into components to bypass "Hooks cannot be called conditionally" error.
//
const UseClickHook = (context) => useClick(context)
const UseHoverHook = (context) => useHover(context)
const UseDismissHook = (context) => useDismiss(context)
