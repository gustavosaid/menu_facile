import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 2221,   // porta interna do container
    host: true,   // necessário pra acessar pelo Docker
  },
})
