/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:
      {
        "yellow-primary": "#ffd700",
        "yellow-secondary": "#eebc1d",
        "black-primary": "#14161a",
        "black-secondary": "#16171a",
        "black-tertiary":"#131111",
        "green-primary": "#0ecb74",
        "red-primary": "#ff000d"
      }
    },
  },
  plugins: [],
}