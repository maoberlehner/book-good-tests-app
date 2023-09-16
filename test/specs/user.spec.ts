import { it } from '@application-test-utils';

import { userDSLFactory } from '../dsl/user';

it('should be possible to login', async ({ driver }) => {
  const user = await driver.setUp(userDSLFactory);

  await user.logIn({ name: 'admin', password: 'password' });
  await user.expectLoggedIn();
});
