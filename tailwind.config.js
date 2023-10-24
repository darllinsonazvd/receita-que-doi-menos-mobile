/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.tsx', './app/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        primary: '#FECC01',
        secondary: '#932743',
      },
    },
  },
  plugins: [],
}
