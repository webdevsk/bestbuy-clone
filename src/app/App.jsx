import { Outlet } from "react-router"
import Header from "../components/Header/Header"
import { useAuth0 } from "@auth0/auth0-react"
import { useDispatch } from "react-redux"
import { setAuthToken } from "../features/account/authSlice"
import { useEffect } from "react"

const App = () => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!isAuthenticated) return
    getAccessTokenSilently({
      audience: import.meta.env.VITE_AUDIENCE,
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
