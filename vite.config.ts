import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  vite: {
    plugins: [svgr()],
  },

  tanstackStart: {
    server: { entry: "server" },
  },
});
