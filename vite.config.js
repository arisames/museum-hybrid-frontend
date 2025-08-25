import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Enable code splitting
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor chunk for React and core libraries
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor';
            }
            // UI libraries chunk
            if (id.includes('@radix-ui') || id.includes('lucide-react')) {
              return 'ui';
            }
            // Form libraries chunk
            if (id.includes('react-hook-form') || id.includes('zod') || id.includes('@hookform')) {
              return 'forms';
            }
            // Utility libraries chunk
            if (id.includes('clsx') || id.includes('tailwind-merge') || id.includes('date-fns') || id.includes('dompurify')) {
              return 'utils';
            }
            // Other vendor libraries
            return 'vendor-misc';
          }
        },
      },
    },
    // Optimize chunk size warning limit
    chunkSizeWarningLimit: 1000,
    // Enable source maps for debugging in production
    sourcemap: true,
    // Minify for smaller bundle size
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log in production
        drop_debugger: true,
      },
    },
  },
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-hook-form',
      '@hookform/resolvers/zod',
      'zod',
      'zustand',
      'sonner',
      'dompurify',
    ],
  },
  // Performance optimizations
  server: {
    fs: {
      strict: false,
    },
  },
})
