import { Float } from "@headlessui-float/react"
import { FloatingOverlay, FloatingPortal, size } from "@floating-ui/react"
import { Fragment, forwardRef, memo } from "react"
import { Popover } from "@headlessui/react"

export const HigherOrderFloat = memo((props) => {
  return (
    <Float
      offset={16}
      arrow={0}
      shift
      placement="bottom"
      transform={false}
      floatingAs={Fragment}
      middleware={[
        size({
          apply({ availableHeight, availableWidth, elements }) {
            elements.floating.style.setProperty(
              "--_spaceX",
              `${availableWidth}px`,
            )
            elements.floating.style.setProperty(
              "--_spaceY",
              `${availableHeight}px`,
            )
          },
        }),
      ]}
      enter="transition duration-200 ease-out"
      enterFrom="opacity-0 scale-y-90"
      enterTo="scale-y-100 opacity-100"
      leave="transition duration-200 ease-in"
      leaveFrom="scale-y-100 opacity-100"
      leaveTo="scale-y-90 opacity-0"
      originClass="origin-top"
      {...props}
    >
      {props.children}
    </Float>
  )
})

HigherOrderFloat.displayName = "HigherOrderFloat"

export const HigherOrderPanel = memo(
  forwardRef((props, ref) => {
    const {
      children,
      lockScroll,
      fullHeight,
      fullWidth,
      height,
      width,
      className,
      containerProps,
      overlay = true,
      ...filteredProps
    } = props
    return (
      <Popover.Panel
        ref={ref}
        className={` ${className ?? ""}`}
        {...filteredProps}
      >
        <Float.Arrow className={`absolute h-5 w-5 rotate-45 bg-white`} />

        {overlay && (
          <FloatingPortal>
            <Popover.Button
              as={FloatingOverlay}
              lockScroll={lockScroll}
              className=" z-30 h-screen w-full bg-black/30"
            />
          </FloatingPortal>
        )}

        <div
          style={{ height: height, width: width }}
          {...containerProps}
          className={`pointer-events-auto relative overflow-y-auto overflow-x-hidden bg-gray-100 text-body shadow-lg ${
            fullHeight ? "h-[--_spaceY]" : "max-h-[--_spaceY] rounded-sm"
          } ${fullWidth ? "w-[--_spaceX]" : "max-w-[--_spaceX] rounded-sm"} ${
            containerProps?.className ?? ""
          }`}
        >
          {children}
        </div>
      </Popover.Panel>
    )
  }),
)

HigherOrderPanel.displayName = "HigherOrderPanel"
