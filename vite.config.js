import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  // FORCE VITE TO MANUALLY WATCH FOR MANUAL SAVES ON WINDOWS 11
  server: {
    watch: {
      usePolling: true,
      interval: 100, // Checks your hard drive for changes every 100ms
    },
  },
})
