import { defineConfig } from 'vite';
import { getThemeVariables } from 'antd/dist/theme';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          'primary-color': '#e4553a',
          'input-hover-border-color': '#0c4267',
          'input-icon-hover-color': '#0c4267',
        },
      },
    },
  },
});
