/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        win: {
          "0%": {
            opacity: 0
          },
          "50%": {
            opacity: 1
          },
          "100%": {
            opacity: 0
          },
        }
      },
      animation: {
        win:"win 0.5s infinite linear"
      }
    },
  },
  plugins: [],
}

