/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme"
import withMT from "@material-tailwind/react/utils/withMT"
import headlessUiPlugin from '@headlessui/tailwindcss'

// imported in src/main.js
const extendedFontFamily = {
  sans: ["DM Sans", ...defaultTheme.fontFamily.sans],
  serif: ["Inter Tight Variable", ...defaultTheme.fontFamily.serif],
}

// Curated from src/index.css@line:5
const extendedColors = {
  theme: "var(--theme-color)",
  background: "var(--background-color)",
  accent: "var(--accent-color)",
  header: "var(--header-color)",
  body: "var(--body-color)",
  important: "var(--important-color)",
  link: "var(--link-color)",
  "link-hover": "var(--link-hover-color)",
  info: "var(--info-color)",
  success: "var(--success-color)",
  warning: "var(--warning-color)",
  error: "var(--error-color)",
}

export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/**/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
    },
    extend: {
      fontFamily: extendedFontFamily,
      colors: extendedColors,
    },
  },
  plugins: [
    headlessUiPlugin
  ],
})
