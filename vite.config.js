import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Vite configuration - my build tool setup
// I'm using React with Tailwind CSS for rapid development
export default defineConfig({
  plugins: [
    react(), // For JSX and React features
    tailwindcss() // For utility-first CSS styling
  ],
})
