import { defineConfig } from 'vitest/config'
import tailwindcss from '@tailwindcss/vite'
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

  plugins: [tailwindcss(), tsconfigPaths()],

  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setup-tests.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      reportsDirectory: './coverage'
    }
  }
})
