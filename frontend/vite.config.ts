import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
      babel: {
        plugins: ["@emotion/babel-plugin"],
      },
    }),
    svgr(),
  ],
  server: {
    port: 3000,
    host: "0.0.0.0",
    // proxy: {
    //   "/api": {
    //     target: "https://j7a607.q.ssafy.io",
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, ""),
    //     secure: false,
    //     ws: true,
    //   },
    // },
  },
});
