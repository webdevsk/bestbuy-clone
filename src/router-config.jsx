import { createBrowserRouter } from "react-router-dom"
import ErrorPage from "./components/ErrorPage"
import HomePage from "./routes/HomePage"
import App from "./app/App"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
])
