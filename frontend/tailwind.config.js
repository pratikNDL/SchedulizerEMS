/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'fast-pulse': 'pulse 0.3s infinite', // Customize the duration here
      },
    },
  },
  plugins: [],
}