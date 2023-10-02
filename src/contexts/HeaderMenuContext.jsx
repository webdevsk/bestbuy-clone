import { createContext, useContext } from "react"

const HeaderMenuContext = createContext(null)
export const useHeaderMenuContext = () => useContext(HeaderMenuContext)
export default HeaderMenuContext
