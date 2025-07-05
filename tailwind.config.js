/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'infinite-scroll': 'infinite-scroll 25s linear infinite',
      },
      keyframes: {
        'infinite-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        },
      },

      colors: {
        white: {
          DEFAULT: '#d9ecff',
          50: '#d9ecff',
        },
        black: {
          DEFAULT: '#000',
          50: '#1c1c21',
          100: '#0e0e10',
          200: '#282732',
        },
        blue: {
          DEFAULT: '#839cb5',
          50: '#839cb5',
          100: '#2d2d38',
        },
      },
      fontFamily: {
        sans: ['"Mona Sans"', 'sans-serif'],
      },
    },
  },

  plugins: [],
}

