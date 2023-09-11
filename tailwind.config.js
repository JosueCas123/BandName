/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'Luck': ['Luckiest Guy']
      },
      colors:{
        primary:'#04394E',
        C2:'#434B4D',
        C3:'#00875E',
        C4:'#FFFFFF'
      },
      spacing:{
        slideLx:"34rem"
        
      }
    },
  },
  plugins: [],
}

