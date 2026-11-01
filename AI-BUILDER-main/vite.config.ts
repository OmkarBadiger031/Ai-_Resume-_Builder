import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, __dirname, '');
    const apiBaseUrl = env.VITE_API_BASE_URL || 'http://localhost:8000';

    return {
      root: __dirname,
      server: {
        port: 3000,
        host: '0.0.0.0',
        proxy: {
          '/api': {
            target: apiBaseUrl.replace(/\/api$/, ''),
            changeOrigin: true,
          },
        },
      },
      css: {
        postcss: path.resolve(__dirname, 'postcss.config.cjs'),
      },
      plugins: [react()],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
