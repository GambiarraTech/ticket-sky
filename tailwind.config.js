/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');
module.exports = {
  content: ['./src/*/.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    colors: {
      'azul-ticket': '#0112a6',
      'hoover-blue': '#0028be',
      'ciano-ticket': '#03f7ff',
      'ticket-sky-blue': '#000D67',
      'blue-hover': '#06118d80',
      'green-500': '#22c55e',
      'green-600': '#16a34a',
      'green-700': '#15803d',
      'gray-100': '#f3f4f6',
      'gray-200': '#e5e7eb',
      'gray-300': '#D1D5DB',
      'gray-400': '#9ca3af',
      'gray-500': '#6b7280',
      'gray-700': '#374151',
      'gray-800': '#1f2937',
      'gray-900': '#111827',
      'gray-950': '#020617',
      'gray-50': '#F9FAFB',
      'blue-100': '#dbeafe',
      'blue-200': '#bfdbfe',
      'blue-700': '#1d4ed8',
      'blue-900': '#1e3a8a',
      'slate-500': '#64748b',
      'red-600': '#dc2626',
      'red-700': '#b91c1c',
      'red-800': '#991b1b',
      black: colors.black,
      white: colors.white,
    },
  },
  plugins: [],
};
