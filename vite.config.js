import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// Vite will now look for a standalone postcss.config.js file in the project root.

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/', // <-- This is the crucial line for static hosting!
})