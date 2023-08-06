import { it } from '@application-test-utils';

it('should motivate us', async ({ driver }) => {
  await driver.goTo('/');
  await driver.findByText('We did it!').shouldBeVisible();
});
