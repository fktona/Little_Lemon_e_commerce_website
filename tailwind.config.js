/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },

    fontSizes: {
      16: "16px",
      18: "18px",
      20: "20px",
      24: "24px",
      36: "36px",
    },
    extend: {
      colors: {
        primary: "#00b860",
        secondary: "#FF8000",
        accent: "#A15A3F",
        "creamy-yellow": "#F5E1A4",
        "crisp-white": "#FFFFFF",
      },
      fontFamily: {
        mono: ["Montserrat", "sans-serifve"],
        popi: ["Poppins", "sans-serifve"],
        lato: ["Lato", "sans-serifve"],
        robo: ["Roboto", "sans-serifve"],
        geor: ["Noto Sans Georgian", "sans-seri"],
        danc: ["Dancing Script", "cursive"],
      },

      boxShadow: {
        outline:
          "rgba(14, 30, 37, 0.12) 0px 2px 2px 0px, rgba(14, 30, 37, 0.22) 0px 2px 6px 0px;",
        inner:
          "rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;",
      },

      fontSize: {
        sm: "0.8rem",
        base: "1rem",
        xl: "1.25rem",
        "2xl": "1.563rem",
        "3xl": "1.953rem",
        "4xl": "2.441rem",
        "5xl": "3.052rem",
      },
    },
  },
  plugins: [],
};
