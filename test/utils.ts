import userEvent from '@testing-library/user-event';
import { makeMockEndpoint } from './mock-endpoint';
import { mockServer } from './mock-server';
import type { Prepare } from './driver';

export { render, screen } from '@testing-library/vue';
export { expect, it } from 'vitest';
export { mockServer, userEvent };

export const mockEndpoint = makeMockEndpoint({ mockServer });

export const prepare: Prepare = (precondition) =>
  precondition({ mockEndpoint });
