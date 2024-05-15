import { afterAll, afterEach, beforeAll } from 'vitest';
import { mockServer } from '../../utils';
import '@testing-library/jest-dom/vitest';

beforeAll(() => mockServer.listen({ onUnhandledRequest: `error` }));
afterAll(() => mockServer.close());
afterEach(() => {
  mockServer.resetHandlers();
  localStorage.clear();
  sessionStorage.clear();
});
