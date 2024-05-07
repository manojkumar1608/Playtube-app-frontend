import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  proxy: {
    // Define your proxy configuration here for development.
    // This is not used in production. Production proxying should
    // typically be handled by the server hosting your application.
    '/api': {
      target: 'https://playtube-app-backend.onrender.com',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, '')
    }
  },
  plugins: [react()]
  
})
