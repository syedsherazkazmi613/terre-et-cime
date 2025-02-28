/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Raleway', 'sans-serif'],
        'display': ['Poppins', 'sans-serif'],
        'playwrite': ['"Playwrite IT Moderna"', 'serif'],
      },
    },
  },
  plugins: [],
} 