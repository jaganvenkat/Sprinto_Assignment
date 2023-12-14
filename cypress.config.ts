import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "https://www.cleartrip.com",
    reporter: "mochawesome",

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
