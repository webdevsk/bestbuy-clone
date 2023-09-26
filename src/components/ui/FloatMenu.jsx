import {
  autoUpdate,
  flip,
  offset,
  shift,
  size,
  useClick,
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
  //   offset = 0,
  whenHovered,
  autoSize,
  shift,
  flip,
  transition,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: placement,
    // whileElementsMounted: autoUpdate,
    middleware: [
      offset(0),
      //   size({
      //     apply({ availableHeight, elements }) {
      //       Object.assign(elements.floating.style, {
      //         height: `${availableHeight}px`,
      //       })
      //     },
      //   }),
      //   shift(),
      //   flip(),
    ],
  })
  const click = useClick(context)
  const hover = useHover(context)

  const { isMounted, styles } = useTransitionStyles(context)
  const { getReferenceProps, getFloatingProps } = useInteractions([
    useClick(context),
    // hover,
  ])
  console.log(context)
  return React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return
    const component = {
      FloatHandler: React.cloneElement(child, {
        ref: refs.reference,
        ...getReferenceProps(),
      }),
      FloatElement: React.cloneElement(child, {
        ref: refs.floating,
        open: isMounted,
        styles: { ...floatingStyles, ...styles },
        ...getFloatingProps(),
      }),
      default: child,
    }
    return component[child.type.displayName ?? "default"]
  })
}

export { FloatMenu }

// Component that contains the button which triggers isOpen.
const FloatHandler = forwardRef((props, ref) =>
  React.cloneElement(React.Children.only(props.children), {
    ref: ref,
  }),
)
FloatHandler.displayName = "FloatHandler"
export { FloatHandler }

// Component that contains the element which renders when isOpen is True
const FloatElement = forwardRef(
  (props, ref) =>
    props.open &&
    React.cloneElement(React.Children.only(props.children), { ref: ref }),
)
FloatElement.displayName = "FloatElement"
export { FloatElement }
