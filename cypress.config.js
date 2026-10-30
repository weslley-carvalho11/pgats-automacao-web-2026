const { defineConfig } = require('cypress');

module.exports = defineConfig({
  chromeWebSecurity: false,

  e2e: {
    baseUrl: 'https://automationexercise.com',
    pageLoadTimeout: 30000,

    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
});