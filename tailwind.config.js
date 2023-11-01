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
        primary: '#FFD900',
        secondary: '#932743',
        foreground: '#F3FF00',
        success: '#13B105',
        danger: '#DE0000',
        info: '#57BBD1',
      },
      backgroundImage: {
        woman: "url('./src/assets/img/bg.jpg')",
      },
    },
  },
  plugins: [],
}
