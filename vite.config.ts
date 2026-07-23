import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import svgr from "vite-plugin-svgr";
import reactTrace from "./src/plugins/vite-plugin-react-trace";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    tsconfigPaths: true,
  },
  plugins: [
    tanstackStart({ server: { entry: "server" } }),
    tailwindcss(),
    react(),
    // vite-plugin-react-trace: instrument JSX with `data-path`
    reactTrace({ enabled: true, root: "src", strategy: "file-path" }),
    svgr(),
  ],
});
