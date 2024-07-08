import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import istanbul from "vite-plugin-istanbul"
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VueDevTools(),
    istanbul({
      requireEnv: false,
      forceBuildInstrument: true,
      include: ["src/*"],
      extension: [".ts", ".vue"],
  }),
    
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
