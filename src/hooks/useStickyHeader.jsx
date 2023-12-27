import {
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion"
import { useEffect, useRef, useState } from "react"

const useStickyHeader = ({
  approxShrunkenHeight = 100,
  margin = 0,
  springConfig = {
    mass: 0.3,
  },
}) => {
  const [isSticking, setIsSticking] = useState(false)
  const { scrollY } = useScroll()

  const headerRef = useRef(null)
  const fillerRef = useRef(null)
  const headerOgHeight = useRef(0)

  // margin is used to Give the page enough time
  // to change layout and getting the shrunken header height

  // We can't get the height of the shrunken header until
  // isSticky is true AND it re-renders with the changed layout.
  // So theres a bit of a delay between isSticky getting true
  // (position sticking) and the shrunken height getting populated
  // If we use the initial value of 0, it will cause a sudden
  // drop in tranlateY. going from -0 to -100 (shrunken height)
  // So its better to use a maximum possible shrunken height here
  // to reduce the drop distance. Just use Desktop shrunken mode size
  // It doesnt have to be accurate. Just a near value would do
  const headerShrunkenHeight = useRef(approxShrunkenHeight) //100 will be -100px initially in translateY

  useEffect(() => {
    if (isSticking) {
      headerShrunkenHeight.current =
        headerRef.current?.getBoundingClientRect().height
    } else {
      // Set filler height
      const headerHeight = headerRef.current.getBoundingClientRect().height
      headerOgHeight.current = headerHeight
      fillerRef.current.style.height = headerHeight + "px"
    }
  }, [headerRef, fillerRef, isSticking])

  const scrollPastHeader = useMotionValue(0)
  useMotionValueEvent(scrollY, "change", (latest) => {
    // calculating how much we've scrolled past the og header
    // using min max to avoid unnecessary re-renders
    // re-renders only when scrollPastHeader is between 0 and headerOgHeight + margin
    scrollPastHeader.set(
      Math.max(
        Math.min(
          latest - headerOgHeight.current,
          headerOgHeight.current + margin,
        ),
        0,
      ),
    )
    // set sticking state if we've scrolled past the og header
    setIsSticking(scrollPastHeader.get() > 0)
  })

  const stickyHeaderY = useTransform(
    scrollPastHeader,
    [0, headerShrunkenHeight.current + margin],
    [-(headerShrunkenHeight.current + margin), 0],
  )

  const stickyHeaderSpringY = useSpring(stickyHeaderY, springConfig)

  const rerender = () => {
    // To reanimate appearance | Causing stickyHeaderY getting negative initial value
    scrollPastHeader.set(0)
    // To recalculate headerOgHeight
    setIsSticking(false)
  }

  // Window resize event listener
  useEffect(() => {
    addEventListener("resize", rerender)
    return () => removeEventListener("resize", rerender)
  }, [])

  const headerStyles = {
    position: isSticking ? "fixed" : "absolute",
    top: 0,
    y: isSticking ? stickyHeaderSpringY : 0,
  }

  return {
    isSticking,
    setIsSticking,
    rerender,
    headerRef,
    fillerRef,
    headerStyles,
    y: stickyHeaderSpringY,
  }
}

export default useStickyHeader
