import { useContext } from "react"
import StickyHeaderContext from "../contexts/StickyHeaderContext"

export const useStickyHeaderContext = () => useContext(StickyHeaderContext)
