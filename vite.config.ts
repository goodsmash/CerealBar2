import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import type { Plugin } from 'vite';

function emailMiddleware(): Plugin {
  return {
    name: 'email-middleware',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        // Handle CORS preflight
        if (req.method === 'OPTIONS') {
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
          res.setHeader('Access-Control-Allow-Headers', 'Content-Type, api-key');
          res.statusCode = 204;
          res.end();
          return;
        }

        if (req.url === '/api/email' && req.method === 'POST') {
          // Set CORS headers
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
          res.setHeader('Access-Control-Allow-Headers', 'Content-Type, api-key');

          try {
            const chunks: Buffer[] = [];
            for await (const chunk of req) {
              chunks.push(Buffer.from(chunk));
            }
            const buffer = Buffer.concat(chunks);
            const text = buffer.toString('utf8');
            
            const modifiedReq = new Request('http://localhost/api/email', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
              },
              body: text
            });

            const { handleEmailRequest } = await import('./src/api/emailHandler');
            const response = await handleEmailRequest(modifiedReq);
            
            // Get response data
            const responseData = await response.text();
            
            // Set response headers
            res.statusCode = response.status;
            res.setHeader('Content-Type', 'application/json');
            
            // Send response
            res.end(responseData);
          } catch (error) {
            console.error('Error handling email request:', error);
            res.statusCode = 500;
            res.end(JSON.stringify({ error: 'Internal server error' }));
          }
          return;
        }
        next();
      });
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  base: '/CerealBar2/',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': [
            '@radix-ui/react-dialog',
            '@radix-ui/react-tabs',
            '@radix-ui/react-toast',
            '@radix-ui/react-tooltip',
            '@radix-ui/react-select',
            '@radix-ui/react-slider',
            '@radix-ui/react-switch',
            '@radix-ui/react-radio-group',
            'framer-motion',
          ],
          'form-vendor': ['@hookform/resolvers', 'react-hook-form', 'zod'],
          'date-vendor': ['date-fns', '@fullcalendar/core', '@fullcalendar/react'],
          'map-vendor': ['@googlemaps/js-api-loader'],
        },
      },
    },
    chunkSizeWarningLimit: 800,
  },
  plugins: [react(), emailMiddleware()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173,
    strictPort: true,
    cors: true,
  },
  preview: {
    port: 5173,
    strictPort: true,
    cors: true,
  },
});
