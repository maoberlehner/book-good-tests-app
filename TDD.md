# TDD Demo

## User Story

```md
# Basic Shopping List (#111)

> As a Grocery Shopper
> I want to keep a list of groceries I need
> so that I have them ready on my next shopping trip.

## Acceptance Criteria:

- It should be possible to add items to the list.
- It should be possible to remove items.

## Additional Information:

- For now, items should only have a `title`. We might add additional fields (e.g., `quantity`) later.
- For the proof of concept, we decided that we don't need a databse, so we'll use `localStorage` to store the list.
- We decided that, at least for the first iteration, we don't need a dedicated functionality for checking off items, but users can use the `remove` functionality instead.
```

## 1. Application Test

```ts
// test/specs/shopping-list.spec.ts
import { it } from '@application-test-utils';

it('should be possible to add items to the list', async ({ driver }) => {
  // I open the shopping list.
  // I add an item to the shopping list.
  // I expect the item to be on the shopping list.
});
```

## 2. Do we need a Component Test?

- No, we build the simplest possible implementation.
- No complicated logic inside the component.

## 3. Straightforward Implementation

```vue
<script setup lang="ts">
import { ref } from 'vue';

const ITEMS_KEY = 'shopping-list-items';

type Item = {
  id: number;
  title: string;
};

const getItems = () => JSON.parse(localStorage.getItem(ITEMS_KEY) || '[]');

const items = ref<Item[]>(getItems());

const addItem = (item: Item) => {
  items.value.push(item);
  localStorage.setItem(ITEMS_KEY, JSON.stringify([item, ...items.value]));
};

const itemNewTitle = ref('');
const handleSubmit = () => {
  addItem({ id: Date.now(), title: itemNewTitle.value });
};
</script>

<template>
  <div class="mx-auto max-w-[512px] p-5 sm:py-16 flex h-screen">
    <div class="w-full">
      <form @submit.prevent="handleSubmit">
        <div>
          <label for="item"> Item </label>
          <input name="item" id="item" v-model="itemNewTitle" />
        </div>
        <button>Add item</button>
      </form>
      <ol>
        <li v-for="item in items" :key="item.id">
          {{ item.title }}
        </li>
      </ol>
    </div>
  </div>
</template>
```

## 4. Refactoring

- Split into multiple components.
- Create a composable (no test, we test it via the Application Test!).

## 5. There might be an opportunity for a Component Test!

```ts
import { expect, it, render, screen, userEvent } from '../../test/utils';

import ShoppingList from './ShoppingList.vue';

it('should reset the title field after adding an item', async () => {
  render(ShoppingList);

  const titleInput = await screen.findByLabelText('Item');
  await userEvent.type(titleInput, 'Bread');
  await userEvent.click(
    await screen.findByRole('button', { name: 'Add item' }),
  );

  expect(titleInput).toHaveValue('');
});
```

## 6. Revisit the ticket and next Application Test

```ts
// ...

it('should be possible to remove items from the list', async ({ driver }) => {
  // I open the shopping list.
  // I add an item to the shopping list.
  // I remove an item from the shopping list.
  // I expect the item not to be on the shopping list.
});
```

## 7. Should we write a Component Test for events and props?

- No, we don't need to test those because we use TypeScript.

## 8. Refactoring

- Making it prettier.
