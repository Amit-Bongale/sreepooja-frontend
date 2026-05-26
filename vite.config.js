import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
    server: {
    host: true, // Listens on all addresses, including LAN and public addresses
  },
  plugins: [react(), tailwindcss()],
});
