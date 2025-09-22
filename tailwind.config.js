/** @type {import('tailwindcss').Config} */
// Tailwind CSS configuration - my styling framework setup
export default {
  content: [
    "./index.html", // Include the main HTML file
    "./src/**/*.{js,ts,jsx,tsx}", // Include all source files for purging unused styles
  ],
  theme: {
    extend: {
      // Custom colors that match our lab's brand
      colors: {
        primary: '#0ea5e9', // Blue for main accent color
        secondary: '#8b5cf6', // Purple for secondary elements
        darkbg: 'rgba(15,15,25,0.98)', // Dark background with slight transparency
      },
    },
  },
}