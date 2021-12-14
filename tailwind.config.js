const defaultThemes = require("tailwindcss/defaultTheme");

module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pro: ["Source Sans Pro", ...defaultThemes.fontFamily.sans],
      },
    },
  },
  variants: { extends: {} },
  plugins: [],
};
