import { createBrowserRouter } from "react-router-dom"
import ErrorPage from "./components/ErrorPage"
import HomePage from "./routes/HomePage"
import App from "./components/App"
import ShopPage from "./routes/ShopPage"
import ProductPage from "./routes/ProductPage"

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
      {
        path: "/shop",
        element: <ShopPage />,
      },
      {
        path: "/product/:productKey",
        element: <ProductPage />,
      },
    ],
  },
])
