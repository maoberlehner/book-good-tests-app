import { it } from '@application-test-utils';

it('works', async ({ driver }) => {
  await driver.goTo('/');
  await driver.findByText('You did it!').shouldBeVisible();
});
