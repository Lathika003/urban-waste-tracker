/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // මේක දාන්න Dark mode එකට
  theme: {
    extend: {
      colors: {
        darkBg: '#000000', // Pure Black
        cardBg: '#111111', // Slightly Lighter Black for cards
        sapphire: '#1e3a8a', // Dark Sapphire Blue
        emerald: {
          400: '#34d399', // Bright Emerald Green
          500: '#10b981',
          600: '#059669',
        }
      },
      boxShadow: {
        'green-glow': '0 0 15px -3px rgba(16, 185, 129, 0.5)',
      },
    },
  },
  plugins: [],
}