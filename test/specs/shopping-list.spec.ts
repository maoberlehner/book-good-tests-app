import { it } from '@application-test-utils';

import { shoppingListDSLFactory } from '../dsl/shopping-list';
import { userDSLFactory } from '../dsl/user';

it('should be possible to add items to the list', async ({ driver }) => {
  const user = await driver.setUp(userDSLFactory);
  const shoppingList = await driver.setUp(shoppingListDSLFactory);

  await user.isLoggedIn();
  await shoppingList.hasItems([]);
  await shoppingList.open();
  await shoppingList.addItem('Item 1');
  await shoppingList.expectItemOnList('Item 1');
});

it('should be possible to remove items', async ({ driver }) => {
  const user = await driver.setUp(userDSLFactory);
  const { user: loggedInUser } = await user.isLoggedIn();

  const shoppingList = await driver.setUp(shoppingListDSLFactory);
  await shoppingList.hasItems([
    { id: '123', userId: loggedInUser.id, title: 'Item 1' },
  ]);

  await shoppingList.open();
  await shoppingList.removeItem('Item 1');
  await shoppingList.expectItemNotOnList('Item 1');
});
