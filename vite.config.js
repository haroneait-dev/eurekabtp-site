import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        pieces: resolve(__dirname, 'pieces.html'),
        identite: resolve(__dirname, 'identite.html')
      }
    }
  }
});
