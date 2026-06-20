import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // важно для Docker
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://aquarium-backend:5000',
        changeOrigin: true,
      },
      '/health': {
        target: 'http://aquarium-backend:5000',
        changeOrigin: true,
      }
    }
  }
})