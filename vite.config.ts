import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    TanStackRouterVite(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "*.png"],
      manifest: {
        name: "Therapew",
        short_name: "Therapew",
        description: "An app built with ❤️ for 🐣",
        theme_color: "#ffffff",
        icons: [
          {
            src: "public/therapew.svg",
            sizes: "192x192",
            type: "image/svg",
          },
          {
            src: "public/therapew.svg",
            sizes: "512x512",
            type: "image/svg",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,png,jpg,svg}"],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.example\.com\/.*/i,
            handler: "NetworkFirst", 
            options: {
              cacheName: "api-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 24 * 60 * 60,
              },
            },
          },
        ],
      },
    }),
  ],
  server: {
    host: "0.0.0.0",
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "require-corp",
    },
  },
  optimizeDeps: {
    exclude: ["@ffmpeg/ffmpeg", "@ffmpeg/util"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
