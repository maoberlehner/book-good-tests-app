import { expect, it, mockEndpoint, render, screen } from '../../test/utils';

import HelloWorld from './HelloWorld.vue';

it('should render', async () => {
  mockEndpoint('https://jsonplaceholder.typicode.com/todos/1', {
    body: { userId: 1, id: 1, title: 'Todo 1', completed: false },
  });
  render(HelloWorld, { props: { msg: 'Hello!' } });

  expect(await screen.findByText('Hello!')).toBeVisible();
  expect(await screen.findByText('Todo 1')).toBeVisible();
});
