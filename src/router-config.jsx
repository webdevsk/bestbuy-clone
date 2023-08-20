import { createBrowserRouter } from "react-router-dom"
import App from "./App"
import ErrorPage from "./error-page"
import HomePage from "./routes/home/HomePage"

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
