import { http, HttpResponse } from 'msw';
import type { SetupWorker } from 'msw/browser';
import type { SetupServerApi } from 'msw/node';
import type { MockEndpoint } from './driver';

export const makeMockEndpoint =
  ({
    mockServer,
  }: {
    mockServer: SetupServerApi | SetupWorker;
  }): MockEndpoint =>
  (endpoint, { body, method = 'get', status = 200 }) => {
    mockServer.use(
      http[method](endpoint, () => HttpResponse.json(body, { status })),
    );
  };
