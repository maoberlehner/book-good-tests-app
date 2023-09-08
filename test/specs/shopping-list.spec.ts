import { it } from '@application-test-utils';

import { shoppingListFactory } from '../dsl/shopping-list';

it('should be possible to add items to the list', async ({ driver }) => {
  const shoppingList = await driver.setUp(shoppingListFactory);
  await shoppingList.open();
  await shoppingList.addItem('Item 1');
  await shoppingList.expectItemOnList('Item 1');
});
