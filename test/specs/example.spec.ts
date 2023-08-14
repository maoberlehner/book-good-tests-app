import { it } from '@application-test-utils';

import { Driver } from '../driver';

const hasTodo =
  ({ mockEndpoint }: Pick<Driver, 'mockEndpoint'>) =>
  () => {
    mockEndpoint('https://jsonplaceholder.typicode.com/todos/1', {
      body: { userId: 1, id: 1, title: 'Todo 1', completed: false },
    });
  };

it('should motivate us', async ({ driver }) => {
  await driver.setUp(hasTodo);
  await driver.goTo('/');
  await driver.findByText('We did it!').shouldBeVisible();
  await driver.findByText('Todo 1').shouldBeVisible();
});
