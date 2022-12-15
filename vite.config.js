// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        day9_2022: resolve(__dirname, 'src/2022/day09/day9_2022.html'),
        day11_2022: resolve(__dirname, 'src/2022/day11/day11_2022.html'),
        day12_2022: resolve(__dirname, 'src/2022/day12/day12_2022.html'),
        day14_2022: resolve(__dirname, 'src/2022/day14/day14_2022.html'),
        day15_2022: resolve(__dirname, 'src/2022/day15/day15_2022.html'),
      },
    },
  },
})