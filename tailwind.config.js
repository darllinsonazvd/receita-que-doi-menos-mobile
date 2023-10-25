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
      backgroundImage: {
        gradient:
          'linear-gradient(90deg, rgba(254,204,1,1) 0%, rgba(147,39,67,1) 100%);',
      },
    },
  },
  plugins: [],
}
