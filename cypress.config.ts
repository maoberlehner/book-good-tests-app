import { defineConfig } from 'cypress';
import * as webpackPreprocessor from '@cypress/webpack-preprocessor';

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    specPattern: 'test/**/*.spec.ts',
    supportFile: 'test/drivers/cypress/support/application-test.ts',
    video: false,
    setupNodeEvents(on, config) {
      const preprocessorOptions = {
        ...webpackPreprocessor.defaultOptions,
        webpackOptions: {
          ...webpackPreprocessor.defaultOptions.webpackOptions,
          module: {
            rules: [
              ...webpackPreprocessor.defaultOptions.webpackOptions.module.rules,
              {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                  {
                    loader: 'ts-loader',
                    options: {
                      transpileOnly: true,
                    },
                  },
                ],
              },
            ],
          },
          resolve: {
            alias: {
              '@application-test-utils': `${process.cwd()}/test/drivers/cypress/driver.ts`,
            },
            extensions: ['.tsx', '.ts', '.js'],
          },
        },
      };
      on('file:preprocessor', webpackPreprocessor(preprocessorOptions));
      return config;
    },
  },
  downloadsFolder: 'test/drivers/cypress/downloads',
  fixturesFolder: 'test/drivers/cypress/fixtures',
  screenshotsFolder: 'test/drivers/cypress/screenshots',
  videosFolder: 'test/drivers/cypress/videos',
});
