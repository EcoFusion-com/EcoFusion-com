import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const isProduction = command === 'build';
  const isPreview = mode === 'preview';
  
  return {
    server: {
      host: "::",
      port: 8080,
    },
    base: isProduction && !isPreview ? '/figma-to-digital-spark/' : '/',
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
