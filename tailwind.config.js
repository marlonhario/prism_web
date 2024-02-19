const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        '3xl': '1600px',
        '4xl': '1800px',
        tall: { raw: '(min-height: 700px)' },
        taller: { raw: '(min-height: 800px) ' },
        tallWide: { raw: '(min-width: 1440px) and (min-height: 700px)' }
      },
      width: {
        inherit: 'inherit',
      },
      maxWidth: {
        '1/2': '50%',
      },
      height: {
        'public-content-desktop': 'calc(100vh - (95px + 50px + 81px))',
        'public-content-mobile': 'calc(100vh - (300px))',
      },
      fontFamily: {
        din2014: [
          '"DIN 2014"',
          'Roboto',
          '"Segoe UI"',
          '"Helvetica Neue"',
          'sans-serif',
        ],
        openSans: [
          '"Open Sans"',
          'Roboto',
          '"Segoe UI"',
          '"Helvetica Neue"',
          'sans-serif',
        ],
        graphik: [
          'Graphik',
          'Roboto',
          '"Segoe UI"',
          '"Helvetica Neue"',
          'sans-serif',
        ],
        dinCondensed: [
          '"DIN Condensed"',
          '"DIN 2014"',
          'Roboto',
          '"Segoe UI"',
          '"Helvetica Neue"',
          'sans-serif',
        ],
      },
      fontSize: {
        xxxs: '8px',
        xxs: '0.625rem',
      },
      zIndex: {
        1: 1,
      },
      borderWidth: {
        half: '.5px',
      },
      backgroundImage: {
        labelContent: 'linear-gradient(135deg, #F7F7F7, #DFDFDF)',
        'radial-gradient':
          'radial-gradient(81.53% 100.7% at 107.33% 29.79%, rgba(0, 0, 0, 0.4) 45.73%, rgba(0, 0, 0, 0) 100%), radial-gradient(129.75% 121.54% at 33.83% 30%, rgba(30, 32, 38, 0.7) 14.58%, rgba(136, 139, 146, 0.7) 100%)',
      },
      colors: {
        black: colors.black,
        white: colors.white,
        gray: colors.slate,
        green: colors.emerald,
        blue: colors.blue,
        PureGrowth: '#C7DB6D',
        PureDiv: '#73BD59',
        MaxDiv: '#F5BD1A',
        GrowthGuard: '#DB3155',
        MaxGrowth: '#65CDF3',
        DivGuard: '#1C59A8',
      },
      flex: {
        full: '1 1 1px',
      },
      transitionProperty: {
        width: 'width',
      },
    },
  },
  variants: {
    extend: {},
  },
  corePlugins: {
    container: false,
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.no-scrollbar::-webkit-scrollbar': {
          display: 'none',
        },
        '.no-scrollbar': {
          '-ms-overflow-style': 'none',
          scrollbarWidth: 'none',
        },
      });
    },
  ],
};
