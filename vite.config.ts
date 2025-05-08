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
      external: ['@vercel/analytics/react', 'leaflet'],
      output: {
        globals: {
          '@vercel/analytics/react': 'vercelAnalytics',
          'leaflet': 'L'
        }
      }
    },
    commonjsOptions: {
      include: [/node_modules/],
    },
    optimizeDeps: {
      include: ['swiper', 'swiper/react', 'swiper/modules', 'leaflet']
    },
    assetsInclude: ['**/*.css'] // This ensures Leaflet's CSS is properly included
  }
}));
