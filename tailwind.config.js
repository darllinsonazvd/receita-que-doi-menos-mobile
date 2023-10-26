/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.tsx', './src/**/*.tsx'],
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
        foreground: '#FEF5C3',
        darkYellow: '#edbf02',
      },
    },
  },
  plugins: [],
}
