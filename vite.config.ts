import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      react: path.resolve('src/react'),
      'react-dom': path.resolve('src/react-dom'),
      'react-dom-bindings': path.resolve('src/react-dom-bindings'),
      'react-reconciler': path.resolve('src/react-reconciler'),
      scheduler: path.resolve('src/scheduler'),
      shared: path.resolve('src/shared'),
    },
  },
  optimizeDeps: {
    force: true,
  },
})
