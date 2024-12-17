import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// export default defineConfig({
//   base: '/',
//   build: {outDir: 'dist'},
//   plugins: [react()],
// })

export default defineConfig(({ command }) => {
  // If the command is "build", set the base to '/static/dist/'
  // If the command is "serve" (dev), use the default '/'
  const base = (command === 'build') ? '/static/dist/' : '/'

  return {
    base,
    build: {
      outDir: 'dist',
    },
    plugins: [react()],
  }
})
