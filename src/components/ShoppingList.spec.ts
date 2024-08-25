import { expect, it, setup, screen } from '../../test/utils';
import ShoppingList from './ShoppingList.vue';

it('should reset the title field after adding a new item', async () => {
  const { user } = setup(ShoppingList);

  const titleInput = await screen.findByLabelText('Item');
  await user.type(titleInput, 'Milk');
  const addButton = await screen.findByRole('button', {
    name: 'Add item',
  });
  await user.click(addButton);

  expect(titleInput).not.toHaveValue();
});
