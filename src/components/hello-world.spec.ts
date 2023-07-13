import { expect, it, render, screen } from '../../test/app-test-utils';

import HelloWorld from './HelloWorld.vue';

it('should render', async () => {
  render(HelloWorld, { props: { msg: 'Hello!' } });

  expect(await screen.findByText('Hello!')).toBeVisible();
});
