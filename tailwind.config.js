/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'quiz-bg': "url('/src/assets/Night.jpg')", // ระบุเส้นทางของรูปภาพ
      },
      fontFamily: {
        sans: ['Prompt', 'sans-serif'], 
        // kanit: ['Kanit', 'sans-serif'], 
        // sriracha: ['Sriracha', 'cursive'], 
      },
    },
  },
  plugins: [],
}

