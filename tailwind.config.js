/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'

const extendedFontFamily = {
  'sans': ['DM Sans', ...defaultTheme.fontFamily.sans],
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
    },
  },
  plugins: [],
}

