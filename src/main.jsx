import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import '@fontsource/dm-sans/400.css'
import '@fontsource/dm-sans/500.css'
import '@fontsource/dm-sans/700.css'
import { ThemeProvider, Typography } from "@material-tailwind/react";
import { theme } from './assets/bestbuyTheme'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider value={theme}>
      <Typography variant='h1' className='text-header'>Hello world</Typography>
    </ThemeProvider>
  </React.StrictMode>,
)
