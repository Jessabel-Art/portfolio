import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  root: "client",              // your app lives in /client
  publicDir: "client/public",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client"),  // @ → client
    },
  },
  server: { fs: { allow: [__dirname] } },
  build: {
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true,
  },
});
