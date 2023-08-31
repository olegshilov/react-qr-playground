import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { comlink } from "vite-plugin-comlink";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/react-qr-playground/",
  plugins: [react(), comlink()],
  worker: {
    format: "es",
    plugins: [comlink()],
  },
});
