/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",  // <--- This line is the most important!
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#E67E22',
          hover: '#D35400',
        },
        secondary: '#F5B041',
        // Keep background as an object so we can provide paper/DEFAULT variants
        background: {
          DEFAULT: '#FDF8F5',
          paper: '#FFFFFF'
        },
        // shorthand alias used across design
        bg: '#FDF8F5',
        text: {
          main: '#2C3E50'
        },
        muted: '#7F8C8D'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      }
      ,
      boxShadow: {
        soft: '0 6px 18px rgba(44,62,80,0.08)'
      },
    },
  },
  plugins: [],
}