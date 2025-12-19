
/** @type {import('tailwindcss').Config} */
export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Oswald', 'sans-serif'],
      },
      colors: {
        brand: {
          black: '#1a1a1a',
          white: '#f5f5f5',
          accent: '#e63946', // Red from the sketch lines/annotations as an accent
        }
      }
    },
  },
  plugins: [],
}
