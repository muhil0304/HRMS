/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sidebar: {
          active: '#3b82f6',
          hover: '#1e293b',
        }
      }
    },
  },
  plugins: [],
}