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
import {
  Children,
  cloneElement,
  useRef,
  useState,
  createContext,
  useContext,
} from "react"

//Context to share properties with children
const FloatMenuContext = createContext(null)
const useFloatMenuContext = () => {
  const context = useContext(FloatMenuContext)
  if (!context)
    throw new Error(
      "FloatMenu.* components must be used inside a FloatMenu component.",
    )
  return context
}

// This is the brain of the component tree. Both FloatHandler and FloatElement has to be inside a FloatMenu for this to work
const FloatMenu = ({
  children,
  offset: distance = 0,
  flip: autoFlip,
  click = false,
  hover = false,
  dismiss = false,
  role = false,
  focus = false,
  transform = true,
  arrow: autoArrow,
  inline: autoInline,
  autoPlacement: autoPlace,
  shift: autoShift,
  size: autoSize,
  hide: autoHide,
  open: defaultOpen = false,
  placement = "bottom-start",
  transition,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const arrowRef = useRef(null)

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    transform: transform,
    onOpenChange: setIsOpen,
    placement: placement,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(distance + (autoArrow?.height ?? 0)),
      autoShift && shift(autoShift),
      autoInline && inline(autoInline),
      autoFlip && flip(autoFlip),
      autoSize &&
        size({
          apply({ availableHeight, availableWidth, elements }) {
            Object.assign(elements.floating.style, {
              maxWidth: `${availableWidth}px`,
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

  return (
    <FloatMenuContext.Provider
      value={{
        referenceProps: {
          open: isOpen,
          ref: refs.setReference,
          ...getReferenceProps(),
        },
        floatingProps: {
          open: transition ? isMounted : isOpen,
          ref: refs.setFloating,
          style: transition
            ? { ...floatingStyles, ...transitionStyles }
            : { ...floatingStyles },
          ...getFloatingProps(),
        },
        arrowProps: autoArrow && {
          ref: arrowRef,
          context: context,
          ...autoArrow,
        },
      }}
    >
      {children}
    </FloatMenuContext.Provider>
  )
}

// Component that triggers isOpen
//
export const FloatHandler = ({ children }) => {
  const { referenceProps } = useFloatMenuContext()
  return cloneElement(
    Children.only(children),
    referenceProps,
    children.props.children,
  )
}
FloatMenu.Handler = FloatHandler

// Component that renders when isOpen is True
//
export const FloatElement = ({ children }) => {
  const { floatingProps, arrowProps } = useFloatMenuContext()
  floatingProps.className =
    "group pointer-events-none [&>*]:pointer-events-auto"
  return (
    floatingProps.open &&
    cloneElement(
      Children.only(children),
      floatingProps,
      children.props.children,
      arrowProps && <FloatingArrow {...arrowProps} />,
    )
  )
}
FloatMenu.Element = FloatElement

export default FloatMenu
