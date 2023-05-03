/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');
module.exports = {
  content: ['./src/*/.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      'ticket-sky-blue': '#000D67',
      white: colors.white,
    },
    extend: {},
  },
  plugins: [],
};
