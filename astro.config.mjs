import { defineConfig } from "astro/config";
import { FontaineTransform } from "fontaine";

const site = "https://slcdts.netlify.app";

// https://astro.build/config
export default defineConfig({
  site: process.env.CI ? site : "http://localhost:4321",
  vite: {
    plugins: [
      FontaineTransform.vite({
        fallbacks: ["Arial"],
        resolvePath: (id) => new URL(`./public${id}`, import.meta.url),
      }),
    ],
  },
});
