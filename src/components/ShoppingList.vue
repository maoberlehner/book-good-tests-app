<script setup lang="ts">
import { ref } from 'vue';

import BaseButton from './BaseButton.vue';
import BaseInput from './BaseInput.vue';
import BaseHeadline from './BaseHeadline.vue';
import ShoppingListList from './ShoppingListList.vue';
import { Item, useItem } from '../composables/item';

const { create: createItem, remove: removeItem, list } = useItem();

let items = ref<Omit<Item, 'userId'>[]>([]);
let itemNewTitle = ref('');

list().then((itemsCurrent) => {
  items.value = itemsCurrent;
});

let add = async () => {
  const itemNew = { title: itemNewTitle.value };
  // Optimistic update
  items.value.push({
    id: `new-${itemNewTitle.value}-${Math.random()}`,
    ...itemNew,
  });
  // Persist
  await createItem(itemNew);
};
let remove = async (id: string) => {
  // Optimistic update
  items.value = items.value.filter((item) => item.id !== id);
  // Persist
  await removeItem({ id });
};
</script>

<template>
  <div class="space-y-6">
    <ShoppingListList :items="items" @remove-item="remove" />

    <div>
      <BaseHeadline level="2">Add new item</BaseHeadline>
      <form @submit.prevent="add" class="flex gap-2 items-end">
        <div class="space-y-1 flex flex-col flex-grow">
          <label for="title">Title</label>
          <BaseInput id="title" v-model="itemNewTitle" name="title" />
        </div>
        <BaseButton>Add item</BaseButton>
      </form>
    </div>
  </div>
</template>
