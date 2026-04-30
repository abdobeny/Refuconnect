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
          DEFAULT: '#2D5A27',
          hover: '#234A1E',
          light: '#4A7C42',
          dark: '#1E3D1A',
        },
        secondary: '#8B7355',
        accent: '#D4A574',
        // Keep background as an object so we can provide paper/DEFAULT variants
        background: {
          DEFAULT: '#F5F1E8',
          paper: '#FFFFFF',
          cream: '#FAF6F0',
          beige: '#F0EAD6'
        },
        // shorthand alias used across design
        bg: '#F5F1E8',
        text: {
          main: '#2C3E50',
          dark: '#1A1A1A',
          light: '#5A5A5A'
        },
        muted: '#6B7280'
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