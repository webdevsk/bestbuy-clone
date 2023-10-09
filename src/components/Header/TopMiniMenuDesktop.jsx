import { Typography } from "@material-tailwind/react"
import { Link } from "react-router-dom"
import { useHeaderMenuContext } from "../../contexts/HeaderMenuContext"

export const TopMiniMenuDesktop = () => {
  const headerMenu = useHeaderMenuContext()
  return (
    <div className="container hidden flex-wrap justify-end gap-3 lg:flex">
      {headerMenu.map((menu) => (
        <Link key={menu.id} to={menu.link} className="hover:underline">
          <Typography variant="small">{menu.label}</Typography>
        </Link>
      ))}
    </div>
  )
}
