import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    hmr: {
      overlay: true, // Show overlay on browser for HMR errors
    },
    // docker
    host: true,
  },
})
