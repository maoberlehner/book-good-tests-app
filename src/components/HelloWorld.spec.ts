import { expect, it, render, screen } from '../../test/utils';

import HelloWorld from './HelloWorld.vue';

it('should work', async () => {
  render(HelloWorld, { props: { msg: 'Hello!' } });

  expect(await screen.findByText('Hello!')).toBeVisible();
});
