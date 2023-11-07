/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        title: 'Baloo2_700Bold',
        body: 'Baloo2_400Regular',
        mouse: 'MouseMemoirs_400Regular',
      },
      colors: {
        primary: '#FAC801',
        secondary: '#FE2A15',
        success: '#13B105',
        danger: '#DE0000',
        info: '#57BBD1',
      },
    },
  },
  plugins: [],
}
