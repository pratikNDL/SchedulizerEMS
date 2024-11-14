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
      colors: {
        "background-primary": "#1A1A1A",
        "background-secondary": "#2A2A2A",

        "primary-text": "#FFFFFF",
        "secondary-text": "#A6A6A6",
        "tertiary-text": "#2D2D2D",

        "border-divider": "#333333",

        "highlight": "#E5C07B",
        "input-highlight": "#98C379",
        "table-highlight": "#6A737D77",

        "primary-orange": "#F89F1B",
        "primary-green": "#98C379",
        "primary-blue": "#61AFEF",
        "primary-gray": "#6A737D",
        "primary-purple": "#C678DD",
        red:  {
          DEFAULT: "#D45757", 
          light: "#E06C75",    
          dark: "#C53030",      
        },
        green: {
          DEFAULT: "#4CAF50",  
          light: "#81C784",     
          dark: "#388E3C",      
        },
        blue: {
          DEFAULT: "#4C8BF5",   
          light: "#90CAF9",     
          dark: "#3A6DB3",      
        },
        yellow: {
          DEFAULT: "#FFCA28",   
          light: "#FFE082",     
          dark: "#FFB300",      
        }
      }
    },
  },
  plugins: [],
}