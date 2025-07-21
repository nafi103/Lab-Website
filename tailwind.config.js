/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0ea5e9',
        secondary: '#8b5cf6',
        darkbg: 'rgba(15,15,25,0.98)',
      },
    },
  },
}