import { it } from '@application-test-utils';

import * as shoppingListDSL from '../dsl/shopping-list';
import * as userDSL from '../dsl/user';

it('should be possible to add items to the list', () => [
  userDSL.isLoggedIn(),
  shoppingListDSL.hasItems({ items: [] }),
  shoppingListDSL.open(),
  shoppingListDSL.addItem({ title: 'Item 1' }),
  shoppingListDSL.expectItemOnList({ title: 'Item 1' }),
]);

it('should be possible to remove items', () => [
  userDSL.isLoggedIn(),
  shoppingListDSL.hasItems({
    items: [{ id: '123', userId: '123', title: 'Item 1' }],
  }),
  shoppingListDSL.open(),
  shoppingListDSL.removeItem({ title: 'Item 1' }),
  shoppingListDSL.expectItemNotOnList({ title: 'Item 1' }),
]);
