export type Item = {
  id: string;
  userId: string;
  title: string;
};

export type ItemCreate = Omit<Item, 'id' | 'userId'>;

export const makeItemRepository = ({
  apiBaseUrl = '/api/',
  token = '',
} = {}) => ({
  create(item: ItemCreate): Promise<Item> {
    return fetch(`${apiBaseUrl}items`, {
      method: 'POST',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => response.json());
  },
  list(): Promise<Item[]> {
    return fetch(`${apiBaseUrl}items`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => response.json());
  },
  async remove(item: Pick<Item, 'id'>): Promise<void> {
    await fetch(`${apiBaseUrl}items/${item.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
});
