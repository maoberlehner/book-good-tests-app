import path from 'path';
import { defineConfig } from 'vitest/config';

import viteConfig from './vite.config';

export default defineConfig({
  ...viteConfig,
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
      provider: 'c8',
      reporter: ['html', 'text'],
      src: [path.resolve('./src')],
    },
    environment: 'jsdom',
    setupFiles: ['./test/drivers/vitest/setup.ts'],
  },
});
