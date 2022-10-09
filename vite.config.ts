import { defineConfig } from 'vite';
import { getThemeVariables } from 'antd/dist/theme';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "./src/global/sass/abstracts/variables/_colors.scss";
        `,
      },
      less: {
        javascriptEnabled: true,
        modifyVars: {
          'primary-color': '#e4553a',
          'secondary-color': '#0c4267',
          'input-hover-border-color': '#0c4267',
          'input-icon-hover-color': '#0c4267',
        },
      },
    },
  },
});
