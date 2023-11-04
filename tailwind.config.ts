/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./components/**/*.{ts,tsx}",
    "./ui_components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      padding: "1rem",
    },
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        transparent: "transparent",
        current: "currentColor",
        black: "#000000",
        whiteSmoke: "#f0f0f0",
        lightgrey: "#d3d3d3",
        lightBlue: "#e1edf0",
        primary: {
          100: "#FAF3ED",
          300: "#8DFFD9",
          500: "#00E599",
          600: "#00AF92",
        },
        primaryDark: {
          100: "#8DFFD9",
          300: "#00E599",
          500: "#00AF92",
        },
        secondary: {
          50: "#F5F5F5",
          100: "#ECECEC",
          200: "#CED1D5",
          300: "#474E66",
          500: "#464E59",
          900: "#282B30",
        },
        secondaryDark: {
          50: "#1C1C1F",
          100: "#252629",
          200: "#37393D",
          300: "#575B61",
          500: "#9AA0AB",
          900: "#E9ECF2",
        },
        base: {
          100: "#F7F2ED",
          200: "#F0F5F0",
          300: "#FDFDFD",
          500: "#F6F7F7",
          700: "#F0F4F5",
        },
        baseDark: {
          100: "#18191A",
          300: "#0F0F0F",
          500: "#292A2B",
        },
        error: {
          100: "#FFF4F3",
          300: "#F9D1CC",
          500: "#E11900",
        },
        errorDark: {
          100: "#2E1816",
          300: "#6E2319",
          500: "#C44A3B",
        },

        info: {
          100: "#DEF0FD",
          300: "#AFDAFA",
          500: "#008BF1",
        },
        infoDark: {
          100: "#001D33",
          300: "#0A3C61",
          500: "#005594",
          600: "#3380B8",
        },
        text: {
          50: "#FFFFFF",
          100: "#BABDC2",
          300: "#797F8A",
          500: "#484D57",
          600: "#919C93",
          700: "#101521",
          900: "#0A0D14",
        },
        textDark: {
          50: "#000000",
          100: "#3F4145",
          300: "#81858C",
          500: "#B0B6BF",
          900: "#FAFCFF",
        },
        support: {
          100: "#F0FAF4",
          300: "#5BC68C",
          500: "#008A4A",
        },
        supportDark: {
          100: "#002916",
          300: "#00522C",
          500: "#008A4A",
        },
        bg: {
          50: "#0F0F0F",
          100: "#FBFBFB",
          200: "#0000004d",
          300: "#384052",
          400: "#0B1514",
          500: "#171E2E",
          600: "#EBF7ED",
        },
        bgDark: {
          100: "#1F2021",
        },
        nftCard: {
          100: "#332D29",
          200: "#2D332D",
          700: "#293133",
        },
      },

      boxShadow: {
        sm: "0px 1px 2px 0px #0000000D",
        "7xl": " 0px 4px 4px 0px #00000040",
      },

      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
