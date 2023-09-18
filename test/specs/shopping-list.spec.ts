import { it } from '@application-test-utils';
import { Step, StepWithOptions } from '../driver';

import * as userDSL from '../dsl/user';

export const open: Step =
  () =>
  ({ driver }) =>
    driver.goTo('/');

export const addItem: StepWithOptions<{ title: string }> =
  ({ title }) =>
  ({ driver }) =>
    [
      () => driver.findByLabelText('Title').type(title),
      () => driver.findByRole('button', { name: 'Add item' }).click(),
    ];

export const expectItemOnList: StepWithOptions<{ title: string }> =
  ({ title }) =>
  ({ driver }) =>
    driver.findByText(title).shouldBeVisible();

const shoppingListDSL = {
  open,
  addItem,
  expectItemOnList,
};

it('should be possible to add items to the list', () => [
  userDSL.isLoggedIn(),
  shoppingListDSL.open(),
  shoppingListDSL.addItem({ title: 'Bread' }),
  shoppingListDSL.expectItemOnList({ title: 'Bread' }),
]);
