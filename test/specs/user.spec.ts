import { it } from '@application-test-utils';

import { userDSLFactory } from '../dsl/user';
import { shoppingListDSLFactory } from '../dsl/shopping-list';

it('should be possible to login', async ({ driver }) => {
  const user = await driver.setUp(userDSLFactory);
  const shoppingList = await driver.setUp(shoppingListDSLFactory);

  await shoppingList.hasItems([]);
  await user.logIn({ name: 'admin', password: 'password' });
  await user.expectLoggedIn();
});
