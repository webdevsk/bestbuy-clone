//This page contains overrides for Material-Tailwind components only
//For font family and base html overrides, check tailwind.config.js and index.css

import { radio } from "@material-tailwind/react"

export const theme = {
  typography: {
    defaultProps: {},
    styles: {
      variants: {
        h1: { fontSize: "text-3xl lg:text-5xl" },
        h2: { fontSize: "text-2xl lg:text-3xl" },
        h3: { fontSize: "text-xl lg:text-2xl" },
        h4: { fontSize: "text-base lg:text-xl" },
        h6: { fontSize: "text-sm lg:text-base" },
        paragraph: { fontSize: "text-sm lg:text-base" },
      },
    },
  },
  button: {
    defaultProps: {
      ripple: false,
    },
    styles: {
      sizes: {
        sm: { className: "rounded-sm" },
        md: { className: "rounded-sm" },
        lg: { className: "rounded-sm" },
      },
    },
  },
  radio: {
    defaultProps: {
      ripple: false,
    },
    valid: {
      colors: [...radio.valid.colors, "theme"],
    },
    styles: {
      base: {
        container: {
          p: "px-3",
        },
        input: {
          before: {
            width: "before:w-8",
            height: "before:h-8",
          },
        },
        label: {
          color: "text-body",
          fontWeight: "font-normal",
        },
      },
      colors: {
        theme: {
          color: "text-theme",
          border: "checked:border-theme",
          before: "checked:before:bg-theme",
        },
      },
    },
  },
  accordion: {
    styles: {
      base: {
        body: {
          className: "pt-0",
        },
      },
    },
  },
}
