const defaultThemes = require("tailwindcss/defaultTheme");

module.exports = {
  mode: "jit",
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./core/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0E2439",
        secondary: "#1F364D",
        text: "#9CB3C9",
        positive: "#69BFAF",
        negative: "#F1A1A1",
      },
      width: {
        "8xl": "87.5rem", // 1400px
      },
      gridTemplateColumns: {
        tableRow: "50px 230px repeat(5, 130px) 200px",
      },
      fontFamily: {
        pro: ["Source Sans Pro", ...defaultThemes.fontFamily.sans],
      },
    },
  },
  variants: { extends: {} },
  plugins: [],
};
