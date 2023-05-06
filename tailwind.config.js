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
      'green-500': '#22c55e',
      'green-600': '#16a34a',
      'green-700': '#15803d',
      'gray-700': '#374151',
      'blue-100': '#dbeafe',
      'blue-200': '#bfdbfe',
      'blue-700': '#1d4ed8',
      'slate-500': '#64748b',
      white: colors.white,
    },
  },
  plugins: [],
};
