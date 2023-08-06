/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'

// imported in src/main.js
const extendedFontFamily = {
  'sans': ['DM Sans', ...defaultTheme.fontFamily.sans],
}

// Curated from src/index.css@line:5
const extendedColors = {
  'theme': 'var(--theme-color)',
  'background': 'var(--background-color)',
  'accent': 'var(--accent-color)',
  'header': 'var(--header-color)',
  'body': 'var(--body-color)',
  'link': 'var(--link-color)',
}

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/**/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: extendedFontFamily,
      colors: extendedColors,
    },
  },
  plugins: [],
}

