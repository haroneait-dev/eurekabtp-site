import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        pieces: resolve(__dirname, 'pieces.html'),
        identite: resolve(__dirname, 'identite.html'),

        reparation: resolve(__dirname, 'reparation.html'),
        preparation: resolve(__dirname, 'preparation.html'),
        location: resolve(__dirname, 'location.html'),
        achatRevente: resolve(__dirname, 'achat-revente.html'),
        services: resolve(__dirname, 'services.html'),
        activites: resolve(__dirname, 'activites.html'),
        atelier: resolve(__dirname, 'atelier.html'),
        livraison: resolve(__dirname, 'livraison.html'),
        login: resolve(__dirname, 'login.html'),
        adminPieces: resolve(__dirname, 'admin/pieces.html')
      }
    }
  }
});
