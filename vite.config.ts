import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

export default defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    rollupOptions: {
      output: {
        // Keep ALL third-party deps in one vendor chunk. Splitting React into a
        // separate chunk from the libraries that consume it broke module init
        // order at runtime ("Cannot read properties of undefined (reading
        // 'useState')") even though the build succeeded. One vendor chunk keeps
        // React and its consumers together so init order is always correct.
        // Route-level React.lazy (see App.tsx) still code-splits the app itself.
        manualChunks(id) {
          if (id.includes("node_modules")) return "vendor";
        },
      },
    },
    // The single vendor chunk is intentionally large; silence the size warning.
    chunkSizeWarningLimit: 1200,
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
