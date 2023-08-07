import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import '@fontsource/dm-sans/400.css'
import '@fontsource/dm-sans/500.css'
import '@fontsource/dm-sans/700.css'
import { ThemeProvider } from "@material-tailwind/react";
import { theme } from './assets/bestbuy-theme'
import { RouterProvider } from 'react-router';
import { router } from './router-config';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider value={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
)
