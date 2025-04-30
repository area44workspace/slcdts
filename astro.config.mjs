import { defineConfig } from "astro/config";

const site = process.env.URL || "http://localhost:4321";

export default defineConfig({
  site,
});
