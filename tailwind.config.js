/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#1E40AF',
          lightBlue: '#3B82F6',
          sky: '#E0F2FE',
          green: '#15803D',
          lightGreen: '#22C55E',
          softGreen: '#DCFCE7',
          bg: '#F8FAFC',
          card: '#FFFFFF'
        }
      }
    },
  },
  plugins: [],
}
