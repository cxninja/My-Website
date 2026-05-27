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
        // Split large third-party deps into their own long-cached chunks so
        // the app chunk stays small and vendors are cached across deploys.
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (id.includes("framer-motion")) return "vendor-motion";
          if (
            id.includes("@sanity") ||
            id.includes("@portabletext") ||
            id.includes("groq") ||
            id.includes("get-it") ||
            id.includes("rxjs")
          )
            return "vendor-sanity";
          if (id.includes("@radix-ui")) return "vendor-radix";
          if (id.includes("lucide-react") || id.includes("react-icons"))
            return "vendor-icons";
          if (id.includes("recharts") || id.includes("/d3-") || id.includes("victory"))
            return "vendor-charts";
          if (
            id.includes("/react/") ||
            id.includes("/react-dom/") ||
            id.includes("/scheduler/") ||
            id.includes("react-helmet-async") ||
            id.includes("/wouter/") ||
            id.includes("@tanstack/react-query")
          )
            return "vendor-react";
          return "vendor";
        },
      },
    },
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
