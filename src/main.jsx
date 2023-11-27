import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import "@fontsource/dm-sans/400.css"
import "@fontsource/dm-sans/500.css"
import "@fontsource/dm-sans/700.css"
// Supports weights 100-900
import "@fontsource-variable/inter-tight"
import { ThemeProvider } from "@material-tailwind/react"
import { theme } from "./assets/material-tailwind-overrides"
import { RouterProvider } from "react-router"
import { router } from "./router-config"
import { register } from "swiper/element/bundle"
import { Provider } from "react-redux"
import store from "./app/store"
import { Auth0Provider } from "@auth0/auth0-react"
import apiSlice from "./features/api/apiSlice"

register()

// Set locale  and currency
const locale = "en-US"
const currency = "USD"
export const localeCurrencyFormatter = new Intl.NumberFormat(locale, {
  style: "currency",
  currency: currency,
})

// Get all products
store.dispatch(apiSlice.endpoints.getProducts.initiate())
store.dispatch(apiSlice.endpoints.getCategories.initiate())

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <Provider store={store}>
        <ThemeProvider value={theme}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </Provider>
    </Auth0Provider>
  </React.StrictMode>,
)
