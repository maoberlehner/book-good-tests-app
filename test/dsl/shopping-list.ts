import type { Driver } from '../driver';

export const shoppingListFactory = (driver: Driver) => ({
  open: async () => {
    await driver.goTo('/');
  },
  addItem: async (title: string) => {
    await driver.findByLabelText('Title').type(title);
    await driver.findByRole('button', { name: 'Add item' }).click();
  },
  removeItem: async (title: string) => {
    await driver.findByRole('button', { name: title }).click();
  },
  expectItemOnList: async (item: string) => {
    await driver.findByText(item).shouldBeVisible();
  },
  expectItemNotOnList: async (item: string) => {
    await driver.queryByText(item).shouldNotExist();
  },
});
