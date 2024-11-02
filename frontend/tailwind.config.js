/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'fast-pulse': 'pulse 1.5s infinite', 
      },
    },
  },
  plugins: [],
}