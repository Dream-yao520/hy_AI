import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteMockServe } from "vite-plugin-mock";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteMockServe({
      mockPath: "mock",
      localEnabled: true,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      // 配置 Pexels API 代理
      '/api/pexels': {
        target: 'https://api.pexels.com/v1',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/pexels/, ''),
        headers: {
          // 这里不需要添加 Authorization 头，因为我们会在 axios 中处理
        }
      }
    }
  }
});