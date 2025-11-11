import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import ViteSitemap from "vite-plugin-sitemap";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss({
      config: {
        theme: {
          extend: {
            fontFamily: {
              noto: ["Noto Sans", "sans-serif"],
            },
          },
        },
      },
    }),
    ViteSitemap({
      hostname: "https://vibrex.tech", 
      outDir: "dist", // Ye default Vite ka build folder hai
      pages: ["/", "/about", "/services", "/contact", "/blog"],
    }),
  ],
});
