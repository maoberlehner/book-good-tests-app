import { afterEach } from 'vitest';
import '@testing-library/jest-dom/vitest';

afterEach(() => {
  localStorage.clear();
  sessionStorage.clear();
});
