import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        pieces: resolve(__dirname, 'pieces.html'),
        identite: resolve(__dirname, 'identite.html'),
        vente: resolve(__dirname, 'vente.html'),
        reparation: resolve(__dirname, 'reparation.html'),
        preparation: resolve(__dirname, 'preparation.html'),
        location: resolve(__dirname, 'location.html'),
        achatRevente: resolve(__dirname, 'achat-revente.html')
      }
    }
  }
});
