import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  // 👇 add this line — it’s crucial for GitHub Pages
  base: "/portfolio/", // replace 'portfolio' with your repo name if different

  plugins: [react(), tsconfigPaths()],

  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./client", import.meta.url)),
      "@components": fileURLToPath(new URL("./client/components", import.meta.url)),
    },
  },

  build: {
    outDir: "dist/spa", // keep your existing output directory
  },
});