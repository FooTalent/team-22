/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
      colors: {
        Purple: '#6945FF',
        Yellow: '#FFDC00',
        PurpleHover: '#5300B8',
        whiteCustom: '#FFFFFFBF',
        Grey: '#9B9B9B',
        BorderGrey: '#EFF0F6',
        card: '#444',
        yellowInput: '#FFDC00',
      },
      backgroundImage:{
        'fondo': "url('/fondoLogin.jpg')"
      },
      boxShadow: {
        custom: '0px 0px 20px 2px #00000033',
        calendar: '0px 0px 4px 0.5px #00000026',
        cardOption: '0px 0px 8px 1px #00000026',
        cardContainer: '0px 0px 12px 1px #00000026',
      }
    },
  },
  plugins: [],
}

