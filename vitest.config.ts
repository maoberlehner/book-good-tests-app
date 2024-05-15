import path from 'path';
import { defineConfig, mergeConfig } from 'vitest/config';

import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      clearMocks: true,
      css: true,
      coverage: {
        all: true,
        exclude: [
          '**/__test__/**/*',
          '**/.eslintrc.js',
          '**/*.spec.ts',
          'test/**/*',
        ],
        provider: 'v8',
        reporter: ['html', 'text'],
        src: [path.resolve('./src')],
      },
      environment: 'jsdom',
      setupFiles: ['./test/drivers/vitest/setup.ts'],
    },
  }),
);