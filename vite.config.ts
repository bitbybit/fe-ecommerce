import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { reactRouter } from '@react-router/dev/vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  build: {
    assetsInlineLimit: 0,
    cssCodeSplit: false,
    cssMinify: false,
    sourcemap: true,
    minify: false
  },

  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern'
      }
    }
  },

  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()]
})
