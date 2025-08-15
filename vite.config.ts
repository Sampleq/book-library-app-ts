import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // адрес на который будет заливаться готовый билд
  base: 'https://sampleq.github.io/book-library-app-ts',

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
