import { Typography } from "@material-tailwind/react"
import { Link } from "react-router-dom"
import { useHeaderMenuContext } from "../../hooks/useHeaderMenuContext"

export const TopMiniMenuDesktop = () => {
  const headerMenu = useHeaderMenuContext()
  return (
    <div className="container hidden flex-wrap justify-end gap-3 lg:flex">
      {headerMenu.map((menu, i) => (
        <Link key={i} to={menu.link} className="hover:underline">
          <Typography variant="small">{menu.label}</Typography>
        </Link>
      ))}
    </div>
  )
}
