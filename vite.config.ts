import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import svgr from "vite-plugin-svgr";
import reactTrace from "./src/plugins/vite-plugin-react-trace";

const srcDir = fileURLToPath(new URL("./src", import.meta.url));

export default defineConfig(() => ({
  base: "/investry/",
  resolve: {
    tsconfigPaths: true,
    alias: {
      "@": srcDir,
    },
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
  plugins: [
    tanstackRouter(),
    tailwindcss(),
    react(),
    // vite-plugin-react-trace: instrument JSX with `data-path`
    reactTrace({ enabled: true, root: "src", strategy: "file-path" }),
    svgr(),
  ],
}));
