import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "./src/global/sass/abstracts/_abstracts.scss";
        `,
      },
      less: {
        javascriptEnabled: true,
        modifyVars: {
          'primary-color': '#254664',
          'secondary-color': '#0c4267',
          'input-hover-border-color': '#0c4267',
          'input-icon-hover-color': '#0c4267',
        },
      },
    },
  },
});
