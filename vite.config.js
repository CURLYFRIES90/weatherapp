import { fileURLToPath, URL } from 'node:url'
<<<<<<< HEAD
=======

>>>>>>> eee8f678e82c5d101ac91393a2bcadfa6127d891
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
<<<<<<< HEAD
  base: '/weatherapp/', 
=======
>>>>>>> eee8f678e82c5d101ac91393a2bcadfa6127d891
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
