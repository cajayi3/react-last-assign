import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [visualizer(), react()],
  build: {
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output:{
        manualChunks: {
          vendor: ['react', 'react-dom'],
          lodash: ['lodash'],
        }
      }
    }
  }
});

