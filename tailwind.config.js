/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');
module.exports = {
  content: ['./src/*/.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
    colors: {
      'azul-ticket': '#0112a6',
      'ciano-ticket': '#03f7ff',
      'ticket-sky-blue': '#000D67',
      white: colors.white,
    },
  },
  plugins: [],
};
