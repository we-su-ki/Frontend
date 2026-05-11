import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    proxy: {
      // /cocktails, /ingredients 로 시작하는 모든 요청을
      // Spring Boot (localhost:8080) 으로 프록시
      '/cocktails': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
      '/ingredients': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
})
