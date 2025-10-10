import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "url";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: "./config.env" });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true, // allow network access
    strictPort: true,
    port: 5173,
    allowedHosts: [
      "localhost",
      "127.0.0.1",
      "192.168.0.106",
      "192.168.0.104",
      ".ngrok-free.dev", // allow all ngrok subdomains
    ],
  },
});
