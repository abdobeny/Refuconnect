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
          DEFAULT: '#2F3634',
          hover: '#242B29',
          light: '#EFE9E1',
          dark: '#1D2321',
        },
        secondary: '#786D64',
        accent: '#A9795F',
        // Keep background as an object so we can provide paper/DEFAULT variants
        background: {
          DEFAULT: '#F3EEE7',
          paper: '#FFFDF9',
          cream: '#F7F1EA',
          beige: '#E8DED2'
        },
        // shorthand alias used across design
        bg: '#F3EEE7',
        text: {
          main: '#343B39',
          dark: '#1F2523',
          light: '#6E706C'
        },
        muted: '#7C7D78'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      }
      ,
      boxShadow: {
        soft: '0 8px 24px rgba(32,42,37,0.08)'
      },
    },
  },
  plugins: [],
}
