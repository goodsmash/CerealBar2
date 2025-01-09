import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: '/CerealBar2/',
  publicDir: 'public',
  server: {
    port: 5173,
    strictPort: true,
    headers: {
      'Content-Security-Policy': `
        default-src 'self';
        script-src 'self' 'unsafe-inline' 'unsafe-eval' https://maps.googleapis.com;
        style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
        img-src 'self' data: https://*.google.com https://*.googleapis.com https://*.gstatic.com;
        frame-src 'self' https://*.google.com https://www.google.com/maps/;
        connect-src 'self' https://*.googleapis.com;
        font-src 'self' data: https://fonts.gstatic.com;
      `.replace(/\s+/g, ' ').trim()
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    'process.env.PUBLIC_URL': '"/CerealBar2"',
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['@radix-ui/react-icons', '@radix-ui/react-slot', '@radix-ui/react-switch'],
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name) {
            const info = assetInfo.name.split('.');
            const ext = info[info.length - 1];
            if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
              return `assets/images/[name][extname]`;
            }
          }
          return `assets/[name]-[hash][extname]`;
        },
      },
    },
    chunkSizeWarningLimit: 800,
  },
  plugins: [react()],
});
