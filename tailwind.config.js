const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  purge: {
    enabled: true,
    content: ["./src/**/*.vue"],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: colors.sky,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
