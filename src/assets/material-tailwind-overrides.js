//This page contains overrides for Material-Tailwind components only
//For font family and base html overrides, check tailwind.config.js and index.css

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
        small: { fontSize: "text-xs lg:text-sm" },
      },
    },
  },
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
  radio: {
    defaultProps: {
      ripple: false,
    },
    valid: {
      colors: ["theme"],
    },
    styles: {
      base: {
        container: {
          p: "p-0",
          m: "mr-2",
        },
        input: {
          w: "w-[1.2rem]",
          h: "h-[1.2rem]",
          before: {
            width: "before:w-8",
            height: "before:h-8",
          },
        },
        label: {
          color: "text-body",
          fontWeight: "font-normal",
        },
        icon: {
          opacity:
            "opacity-0 peer-hover:opacity-20 peer-checked:opacity-100 peer-checked:peer-hover:opacity-100",
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
