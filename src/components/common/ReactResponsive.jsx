import { useMediaQuery } from "react-responsive"
import tailwindConfig from "../../../tailwind.config"
import resolveConfig from "tailwindcss/resolveConfig"
const fullConfig = resolveConfig(tailwindConfig)

export const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({
    minWidth: parseInt(fullConfig.theme.screens.lg),
  })
  return isDesktop ? children : null
}

export const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({
    maxWidth: parseInt(fullConfig.theme.screens.lg) - 0.1,
  })
  return isMobile ? children : null
}
