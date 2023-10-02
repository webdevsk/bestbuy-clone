import { createContext, useContext } from "react"

const MainMenuContext = createContext(null)
export const useMainMenuContext = () => useContext(MainMenuContext)
export default MainMenuContext
