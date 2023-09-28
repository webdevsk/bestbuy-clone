import {
  FloatingArrow,
  arrow,
  autoPlacement,
  autoUpdate,
  flip,
  hide,
  inline,
  offset,
  shift,
  size,
  useClick,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
  useTransitionStyles,
} from "@floating-ui/react"
import React, { forwardRef, useRef, useState } from "react"

// This is the brain of the component tree. Both FloatHandler and FloatElement has to be inside a FloatMenu for this to work
export const FloatMenu = ({
  children,
  distance = 0,
  autoFlip,
  click = false,
  hover = false,
  dismiss = false,
  role = false,
  focus = false,
  autoArrow = false,
  autoInline,
  autoPlace,
  autoShift,
  autoSize,
  autoHide,
  defaultOpen = false,
  placement = "bottom-start",
  transition,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const arrowRef = useRef(null)

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: placement,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(distance + autoArrow?.height ?? 0),
      autoShift && shift(autoShift),
      autoInline && inline(autoInline),
      autoFlip && flip(autoFlip),
      autoSize &&
        size({
          apply({ availableHeight, elements }) {
            Object.assign(elements.floating.style, {
              height: `${availableHeight}px`,
            })
          },
        }),
      !autoFlip && autoPlace && autoPlacement(autoPlace),
      autoArrow && arrow({ element: arrowRef }),
      autoHide && hide(autoHide),
    ],
  })

  const { isMounted, styles: transitionStyles } = useTransitionStyles(context)
  const { getReferenceProps, getFloatingProps } = useInteractions([
    useClick(context, { enabled: click, ...click }),
    useHover(context, { enabled: hover, ...hover }),
    useDismiss(context, { enabled: dismiss, ...dismiss }),
    useFocus(context, { enabled: focus, ...focus }),
    useRole(context, { enabled: role, ...role }),
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
        //Button gets raw state for styling purpose
        open: isOpen,
        ...getReferenceProps(),
      }),
      FloatElement: React.cloneElement(child, {
        ref: refs.setFloating,
        //Element gets different state based on transition settings
        arrow: autoArrow,
        context: context,
        arrowRef: arrowRef,
        open: transition ? isMounted : isOpen,
        style: transition
          ? { ...floatingStyles, ...transitionStyles }
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
export const FloatElement = forwardRef((props, ref) => {
  // const filteredProps =
  return (
    props.open && (
      <div ref={ref} {...props}>
        {props.arrow && (
          <FloatingArrow
            ref={props.arrowRef}
            context={props.context}
            {...props.arrow}
          />
        )}
        {props.children}
      </div>
    )
  )
})
FloatElement.displayName = "FloatElement"
