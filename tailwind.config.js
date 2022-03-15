module.exports = {
  content: ["./{src,docs}/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms"),
  ],
}
