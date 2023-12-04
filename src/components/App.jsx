import { useAuth0 } from "@auth0/auth0-react"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Outlet } from "react-router"
import { setAuthToken } from "../features/auth/authSlice"
import Header from "./header/Header"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { ScrollRestoration } from "react-router-dom"

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
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="colored"
      />
      <ScrollRestoration
        getKey={(location, matches) => {
          const whiteList = ["/", "/shop"]
          return whiteList.includes(location.pathname)
            ? location.pathname
            : location.key
        }}
      />
    </>
  )
}

export default App
