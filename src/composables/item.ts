import { makeItemRepository } from '../repositories/item';

export type { Item, ItemCreate } from '../repositories/item';

export const useItem = () => {
  if (!localStorage.getItem('token')) {
    throw new Error('No token found');
  }

  const itemRepository = makeItemRepository({
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
    token: localStorage.getItem('token') || '',
  });

  return itemRepository;
};
