import { fileURLToPath, URL } from 'node:url'
import { resolve } from "path";

import { defineConfig } from 'vite'
import istanbul from "vite-plugin-istanbul"
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'

const INDEX_PAGE_NAME = "index.html";

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
  build: {
      sourcemap: "hidden",
      target: "esnext",
      rollupOptions: {
          input: {
              main: resolve(__dirname, INDEX_PAGE_NAME),
          },
      },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
