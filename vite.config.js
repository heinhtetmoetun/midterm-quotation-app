import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/midterm-quotation-app/', // must match repo name exactly
  plugins: [react()],
})
