import { it } from '@application-test-utils';

import { makeShoppingList } from '../dsl/shopping-list';

it('should be possible to add items to the list', async ({ driver }) => {
  const shoppingList = makeShoppingList({ driver });
  await shoppingList.open();
  await shoppingList.addItem('Butter');
  await shoppingList.expectItemOnList('Butter');
});

it('should be possible to remove items', async ({ driver }) => {
  const shoppingList = makeShoppingList({ driver });
  await shoppingList.open();
  await shoppingList.removeItem('Oranges');
  await shoppingList.expectItemNotOnList('Oranges');
});
