import type { Item } from '../../src/entities/shopping-list';
import type { Driver } from '../driver';

const itemsDefault: Item[] = [
  {
    id: 1,
    title: 'Nuts',
  },
  {
    id: 2,
    title: 'Oranges',
  },
];

const hasItemsPrecondition =
  (items: Item[]) =>
  ({ localStorage }: { localStorage: Storage }) => {
    localStorage.setItem('shopping-list', JSON.stringify(items));
  };

export const makeShoppingList = ({ driver }: { driver: Driver }) => {
  return {
    async open() {
      await driver.prepare(hasItemsPrecondition(itemsDefault));
      await driver.goTo('/');
    },
    async addItem(itemTitle: Item['title']) {
      await driver.findByLabelText('Item').type(itemTitle);
      await driver.findByRole('button', { name: 'Add item' }).click();
    },
    async removeItem(itemTitle: Item['title']) {
      await driver
        .findByRole('button', { name: `Remove ${itemTitle}` })
        .click();
    },
    async expectItemOnList(itemTitle: Item['title']) {
      await driver.findByText(itemTitle).shouldBeVisible();
    },
    async expectItemNotOnList(itemTitle: Item['title']) {
      await driver.queryByText(itemTitle).shouldNotBeVisible();
    },
  };
};
