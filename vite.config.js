// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        day9_2022: resolve(__dirname, 'day9_2022.html'),
        day11_2022: resolve(__dirname, 'day11_2022.html'),
        day12_2022: resolve(__dirname, 'day12_2022.html'),
        day14_2022: resolve(__dirname, 'day14_2022.html'),
      },
    },
  },
})