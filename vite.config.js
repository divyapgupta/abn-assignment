import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import { configDefaults } from "vitest/config";

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  test: {
    globals: true,
    environment: "jsdom",
    exclude: [...configDefaults.exclude, "tests/e2e/**"],
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
