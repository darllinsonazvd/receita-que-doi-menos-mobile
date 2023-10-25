/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.tsx', './app/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        title: 'Poppins_700Bold',
        body: 'Poppins_400Regular',
        alt: 'Poppins_200ExtraLight',
      },
      colors: {
        primary: '#FECC01',
        secondary: '#932743',
      },
    },
  },
  plugins: [],
}
