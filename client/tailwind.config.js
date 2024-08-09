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
        YellowDeselect: '#FFF8CC',
        PurpleHover: '#5300B8',
        whiteCustom: '#FFFFFFBF',
        Grey: '#9B9B9B',
        BorderGrey: '#EFF0F6',
        card: '#444',
        yellowInput: '#FFDC00',
        a1a2: '#25CFB7',
        b1b2: '#3A9FB6',
        c1c2: '#3C5A99',
        inputBg: '#F9F9F9',
        darkGray: '#444444',
        tableHead: '#1B1B1B',
      },
      backgroundImage: {
        'fondo': "url('/fondoLogin.jpg')"
      },
      boxShadow: {
        custom: '0px 0px 20px 2px #00000033',
        calendar: '0px 0px 4px 0.5px #00000026',
        cardContainer: '0px 0px 8px 1px #00000026',
        modal: '0px 0px 12px 0px #00000080',
        home: '0px 0px 4px 1px #00000033',
        customTable: '0px 0px 4px 1px #00000026',
      },
      fontSize: {
        customTitle: '28px',
        custom: '22px',
        customSubTitle: '26px',
        home: '32px',
      },
      padding: {
        '8p': '8%',
      },
      lineHeight: {
        custom: '18.75px',
      },
      transitionDuration: {
        '600': '600ms',
      },
      borderWidth: {
        half: '0.5px'
      },
    },
  },
  plugins: [
    require('tailwindcss/plugin')(({ addVariant }) => {
      addVariant('search-cancel', '&::-webkit-search-cancel-button');
    }),
  ],
}

