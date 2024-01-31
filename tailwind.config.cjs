const withMT = require("@material-tailwind/react/utils/withMT");

/** @type {import('tailwindcss').Config} */
module.exports = withMT({
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {},      
    screens: {
      '@custom-mq': {'raw': '(max-height: 300px)'},
      // 'sm': '640px',  // equvalente a  @media (min-width: 640px) { ... }
    },
    // screens: { 
    //   'custom-mq': { 'raw': '((max-width: 500px) and (max-height: 500px))' }, 
    // },
    fontFamily: {
      'Cormorant-Garamond': ['Cormorant Garamond', 'serif'],
      'Lora': ['Lora', 'serif'],
      'Roboto-Mono': ['Roboto Mono', 'monospace']
    }
    
  },
  plugins: [ ],
});
