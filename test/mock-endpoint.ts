import { http, HttpResponse } from 'msw';
import type { SetupWorker } from 'msw/browser';
import type { SetupServerApi } from 'msw/node';

type MockEndpoint = (
  endpoint: string,
  {
    body,
    method,
    status,
  }: {
    body: any;
    method?: 'get' | 'post' | 'put' | 'delete' | 'patch';
    status?: number;
  },
) => void;

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
