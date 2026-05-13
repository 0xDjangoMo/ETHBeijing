import { defineConfig } from "astro/config";
import astroI18next from "astro-i18next";

// https://astro.build/config
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  server: {
    port: 3000,
  },
  integrations: [react(), astroI18next()],
});
