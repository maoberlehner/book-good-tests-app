import { expect, it, render, screen, userEvent } from '../../test/utils';
import ShoppingListList from './ShoppingListList.vue';

it('should emit a remove event when clicking an item', async () => {
  const { emitted } = render(ShoppingListList, {
    props: {
      items: [
        { id: 1, title: 'Item 1' },
        { id: 2, title: 'Item 2' },
        { id: 3, title: 'Item 3' },
      ],
    },
  });

  await userEvent.click(await screen.findByRole('button', { name: 'Item 1' }));

  expect(emitted()['remove-item'][0][0]).toEqual(1);
});
