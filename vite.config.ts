import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      external: ['@vercel/analytics/react'],
      output: {
        globals: {
          '@vercel/analytics/react': 'vercelAnalytics'
        }
      }
    },
    commonjsOptions: {
      include: [/node_modules/],
    },
    optimizeDeps: {
      include: ['swiper', 'swiper/react', 'swiper/modules']
    }
  },
  css: {
    preprocessorOptions: {
      css: {
        additionalData: `@import 'leaflet/dist/leaflet.css';`
      }
    }
  }
}));
