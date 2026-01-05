import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/rugby-play-builder/',
  plugins: [react()],
  build: {
    outDir: 'dist'
  }
})
