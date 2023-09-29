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
  forwardRef,
  useRef,
  useState,
  isValidElement,
  useEffect,
} from "react"

// This is the brain of the component tree. Both FloatHandler and FloatElement has to be inside a FloatMenu for this to work
export const FloatMenu = ({
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

  //Instead of calling the components directly, we loop through children, check if required components are present,
  //clone them while passing refs and other props
  //
  return Children.map(children, (child) => {
    if (!isValidElement(child)) return

    //This is just an alternative to Switch statement
    const component = {
      FloatHandler: cloneElement(child, {
        ref: refs.setReference,
        //Button gets raw state for styling purpose
        open: isOpen,
        ...getReferenceProps(),
      }),
      FloatElement: cloneElement(child, {
        ref: refs.setFloating,
        //Element gets different state based on transition settings
        arrow: autoArrow,
        context: autoArrow ? context : null,
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
export const FloatHandler = forwardRef(
  (props, ref) =>
    cloneElement(
      Children.only(props.children),
      {
        ref: ref,
        ...props,
      },
      props.children.props.children,
    ),
  // <button ref={ref} {...props}></button>
)
FloatHandler.displayName = "FloatHandler"

// Component that renders when isOpen is True
//
export const FloatElement = forwardRef((props, ref) => {
  //removing unwanted props from DOM element
  const filteredProps = Object.assign({}, props)
  delete filteredProps.arrow
  delete filteredProps.arrowRef
  delete filteredProps.context
  return (
    props.open && (
      <div
        ref={ref}
        {...filteredProps}
        className={`pointer-events-none [&>*]:pointer-events-auto ${filteredProps.className}`}
      >
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
