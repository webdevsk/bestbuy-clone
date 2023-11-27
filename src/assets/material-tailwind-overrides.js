//This page contains overrides for Material-Tailwind components only
//For font family and base html overrides, check tailwind.config.js and index.css

export const theme = {
  button: {
    defaultProps: {
      ripple: false,
    },
    styles: {
      base: {
        initial: {
          textTransform: "",
        },
      },
      sizes: {
        sm: { className: "rounded-sm" },
        md: { className: "rounded-sm" },
        lg: { className: "rounded-sm" },
      },
    },
  },
  accordion: {
    styles: {
      base: {
        header: {
          initial: {
            py: "py-2 xl:py-4",
          },
        },
        body: {
          className: "pt-2 xl:pt-0",
        },
      },
    },
  },
  iconButton: {
    defaultProps: {
      variant: "text",
      ripple: false,
      size: "sm",
      className: "hover:bg-transparent active:bg-transparent",
    },
    valid: {
      colors: ["white", "theme"],
    },
    styles: {
      base: {
        textTransform: "normal-case",
      },
      variants: {
        text: {
          white: {
            color: "text-white",
            hover: "hover:text-accent",
            active: "active:text-accent",
          },
          theme: {
            color: "text-theme",
          },
        },
      },
    },
  },
}
