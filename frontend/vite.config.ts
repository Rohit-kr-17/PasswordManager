import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate", // Automatically update the service worker
      manifest: {
        name: "PasswordManager",
        short_name: "PM",
        description: "Keeps your password safe",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        icons: [
          {
            src: "/src/icons/Logo-01.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/src/icons/Logo-01.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
