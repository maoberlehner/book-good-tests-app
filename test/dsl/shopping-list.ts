import { Driver } from '../driver';

export const shoppingListFactory = (driver: Driver) => ({
  open: async () => {
    await driver.goTo('/');
  },
  addItem: async (title: string) => {
    await driver.findByLabelText('Title').type(title);
    await driver.findByRole('button', { name: 'Add item' }).click();
  },
  expectItemOnList: async (item: string) => {
    await driver.findByText(item).shouldBeVisible();
  },
});
