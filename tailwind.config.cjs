const withMT = require("@material-tailwind/react/utils/withMT");

/** @type {import('tailwindcss').Config} */
module.exports = withMT({
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {},      
    fontFamily: {
      'Cormorant-Garamond': ['Cormorant Garamond', 'serif'],
      'Lora': ['Lora', 'serif'],
      'Roboto-Mono': ['Roboto Mono', 'monospace']
    }
    
  },
  plugins: [ ],
});
