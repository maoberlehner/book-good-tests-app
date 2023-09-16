import { SetupFactoryOptions } from '../driver';
import { makeDb } from '../../server/db.mjs';
import { makeItemRepository } from '../../server/repositories/item.mjs';

const db = makeDb();
const itemRepository = makeItemRepository({ db });

export const shoppingListDSLFactory = ({ driver }: SetupFactoryOptions) => ({
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
  hasItems: async (items: { userId: string; title: string }[]) => {
    for (const item of items) {
      await itemRepository.create(item);
    }
  },
  expectItemOnList: async (item: string) => {
    await driver.findByText(item).shouldBeVisible();
  },
  expectItemNotOnList: async (item: string) => {
    await driver.queryByText(item).shouldNotExist();
  },
});
