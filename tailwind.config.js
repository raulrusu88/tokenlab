const defaultThemes = require("tailwindcss/defaultTheme");

module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0E2439",
        secondary: "#1F364D",
        text: "#9CB3C9",
        positive: "#69BFAF",
        negative: "#F1A1A1",
      },
      fontFamily: {
        pro: ["Source Sans Pro", ...defaultThemes.fontFamily.sans],
      },
    },
  },
  variants: { extends: {} },
  plugins: [],
};
