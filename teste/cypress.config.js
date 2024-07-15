import { defineConfig } from "cypress";

export default defineConfig({
  chromeWebSecurity: false, //comentar
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://erickwendel.github.io/vanilla-js-web-app-example/', //variavel para a url
    testIsolation: false //nao vai limpar o estado da tela apos cada it
  },
});
