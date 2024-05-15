import type { Precondition } from '../../../test/driver';

export const hasItems: Precondition = ({ mockEndpoint }) => {
  mockEndpoint('/api/shopping-list', {
    body: [
      {
        id: 1,
        title: 'Bread',
      },
      {
        id: 2,
        title: 'Butter',
      },
    ],
  });
};
