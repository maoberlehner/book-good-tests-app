import { it } from '@application-test-utils';

import * as shoppingListDSL from '../dsl/shopping-list';
import * as userDSL from '../dsl/user';

it('should be possible to login', () => [
  shoppingListDSL.hasItems({ items: [] }),
  userDSL.logIn({ name: 'admin', password: 'password' }),
  userDSL.expectLoggedIn(),
]);
