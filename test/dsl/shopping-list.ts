import { SetupFactoryOptions } from '../driver';

export const shoppingListDSLFactory = ({ driver }: SetupFactoryOptions) => ({
  open: async () => {
    await driver.goTo('/');
  },
  addItem: async (title: string) => {
    await driver.mockEndpoint('http://localhost:5173/api/items', {
      method: 'post',
      body: { id: '123', userId: '123', title },
    });
    await driver.findByLabelText('Title').type(title);
    await driver.findByRole('button', { name: 'Add item' }).click();
  },
  removeItem: async (title: string) => {
    await driver.mockEndpoint('http://localhost:5173/api/items/*', {
      method: 'delete',
      body: { success: true },
    });
    await driver.findByRole('button', { name: title }).click();
  },
  hasItems: async (items: { id: string; userId: string; title: string }[]) => {
    await driver.mockEndpoint('http://localhost:5173/api/items', {
      body: items,
    });
  },
  expectItemOnList: async (item: string) => {
    await driver.findByText(item).shouldBeVisible();
  },
  expectItemNotOnList: async (item: string) => {
    await driver.queryByText(item).shouldNotExist();
  },
});
