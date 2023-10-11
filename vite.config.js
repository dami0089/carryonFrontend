import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
  server: {
    host: '0.0.0.0'
  },
  optimizeDeps: {
    // Agregar "fs" como un módulo externo
    exclude: ["nodemailer"],
  },
});
