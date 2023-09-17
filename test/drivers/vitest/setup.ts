import matchers from '@testing-library/jest-dom/matchers';
import { afterAll, afterEach, beforeAll, expect } from 'vitest';
import { mockServer } from '../../mock-server';

expect.extend(matchers);

beforeAll(() => mockServer.listen({ onUnhandledRequest: 'error' }));
afterAll(() => mockServer.close());
afterEach(() => {
  mockServer.resetHandlers();
  localStorage.clear();
  sessionStorage.clear();
});
