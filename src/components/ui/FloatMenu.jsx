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
import { useRef, useState, createContext, useContext, memo } from "react"

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
const FloatMenu = memo(
  ({
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
                width: `${availableWidth}px`,
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
  },
)
FloatMenu.displayName = "FloatMenu"

// Component that triggers isOpen
//
export const FloatHandler = memo((props) => {
  const { referenceProps } = useFloatMenuContext()
  return (
    <button {...referenceProps} {...props}>
      {props.children}
    </button>
  )
})
FloatHandler.displayName = "FloatHandler"
FloatMenu.Handler = FloatHandler

// Component that renders when isOpen is True
//
export const FloatElement = memo((props) => {
  const { floatingProps, arrowProps } = useFloatMenuContext()
  return (
    floatingProps.open && (
      <ul
        {...floatingProps}
        className={`group pointer-events-none [&>*]:pointer-events-auto ${props.className}`}
      >
        {props.children}
        {arrowProps && <FloatingArrow {...arrowProps} />}
      </ul>
    )
  )
})

FloatElement.displayName = "FloatElement"
FloatMenu.Element = FloatElement

export default FloatMenu
