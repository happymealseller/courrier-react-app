import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// export default defineConfig({
  
// })

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    define: {
      'process.env': env
    },
    plugins: [react()],
      server: {
        port: 3000
    },
    test: {
      environment: 'jsdom', // add jsdom to vite
      global: true,
      setupFiles: 'src/tests/setup.ts'
    },
  }
})
