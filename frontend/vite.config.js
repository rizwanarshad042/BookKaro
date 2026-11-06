import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const devApiTarget = process.env.VITE_DEV_API_TARGET || 'http://localhost:5000'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    open: 'http://localhost:5173',
    proxy: {
      '/api': {
        target: devApiTarget,
        changeOrigin: true,
        secure: false,
      },
      '/uploads': {
        target: devApiTarget,
        changeOrigin: true,
        secure: false,
      },
      '/invoices': {
        target: devApiTarget,
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
