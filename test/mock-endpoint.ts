import { SetupWorker, rest } from 'msw';
import { SetupServer } from 'msw/lib/node';

export const makeMockEndpoint =
  ({ mockServer }: { mockServer: SetupServer | SetupWorker }) =>
  (
    endpoint: string,
    {
      body,
      method = 'get',
      status = 200,
    }: {
      body: string | [unknown] | Record<string | number, unknown>;
      method?: 'get' | 'post' | 'put' | 'patch' | 'delete';
      status?: number;
    },
  ) => {
    mockServer.use(
      rest[method](endpoint, (req, res, ctx) =>
        res(ctx.status(status), ctx.json(body)),
      ),
    );
  };
