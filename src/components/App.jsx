import { useAuth0 } from "@auth0/auth0-react"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Outlet } from "react-router"
import { setAuthToken } from "../features/auth/authSlice"
import Header from "./header/Header"

const App = () => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!isAuthenticated) return
    getAccessTokenSilently({
      audience: import.meta.env.VITE_AUDIENCE,
      scope: `openid profile email`,
    }).then((token) => dispatch(setAuthToken(token)))
  }, [dispatch, getAccessTokenSilently, isAuthenticated])

  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default App
