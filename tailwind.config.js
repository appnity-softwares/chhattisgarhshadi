/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          main: '#E91E63',
          dark: '#C2185B',
          light: '#F8BBD0',
          lighter: '#FCE4EC',
        },
        secondary: {
          main: '#9C27B0',
          dark: '#7B1FA2',
          light: '#E1BEE7',
          lighter: '#F3E5F5',
        },
        accent: {
          main: '#FF6D00',
          dark: '#E65100',
          light: '#FFB74D',
        },
        success: '#4CAF50',
        warning: '#FFC107',
        error: '#F44336',
        info: '#2196F3',
        premium: '#FFD700',
      },
    },
  },
  plugins: [],
}