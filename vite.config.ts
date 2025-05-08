import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      external: ['@vercel/analytics/react', '@tanstack/react-query'],
      output: {
        globals: {
          '@vercel/analytics/react': 'vercelAnalytics',
          '@tanstack/react-query': 'reactQuery'
        }
      }
    },
    commonjsOptions: {
      include: [/node_modules/],
    },
    optimizeDeps: {
      include: ['swiper', 'leaflet']
    }
  },
  css: {
    preprocessorOptions: {
      css: {
        additionalData: `@import 'leaflet/dist/leaflet.css';`
      }
    }
  },
  assetsInclude: ['**/*.png']
}));
