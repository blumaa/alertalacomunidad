import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
    server: {
      deps: {
        inline: ['@mond-design-system/theme'],
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    mainFields: ['module', 'main'],
  },
  ssr: {
    noExternal: ['@mond-design-system/theme'],
  },
})
