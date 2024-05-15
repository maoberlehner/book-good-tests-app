// import { setupWorker } from 'msw/browser';

import './assets/main.css';

import { makeRouter } from './router';
import { mount } from './mount';
// import { makeMockEndpoint } from '../test/mock-endpoint';

// const mockServer = setupWorker();
// mockServer.start();

// const mockEndpoint = makeMockEndpoint({ mockServer });
// mockEndpoint('/products', {
//   body: [
//     /* products with different tax rates */
//   ],
// });

mount({ router: makeRouter() });
