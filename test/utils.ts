import userEvent from '@testing-library/user-event';
import { makeMockEndpoint } from './mock-endpoint';
import { mockServer } from './mock-server';
import { render, type RenderOptions } from '@testing-library/vue';
import type { Prepare } from './driver';
import type { Component } from 'vue';

export { screen } from '@testing-library/vue';
export { expect, it } from 'vitest';
export { mockServer };

export const mockEndpoint = makeMockEndpoint({ mockServer });

export const prepare: Prepare = async (precondition) =>
  precondition({ mockEndpoint, localStorage });

export const setup = (
  component: Component,
  { renderOptions }: { renderOptions?: RenderOptions } = {},
) => {
  return {
    user: userEvent.setup(),
    ...render(component, renderOptions),
  };
};
