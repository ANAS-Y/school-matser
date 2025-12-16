import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 1. This handles the "global" variable PouchDB needs
  define: {
    global: 'window',
  },
  // 2. This forces Vite to handle PouchDB correctly
  optimizeDeps: {
    include: ['pouchdb-browser', 'pouchdb-find'],
  },
})