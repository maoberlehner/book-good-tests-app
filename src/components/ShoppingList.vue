<script setup lang="ts">
import { ref } from 'vue';
import type { Item } from '../entities/shopping-list';
import ShoppingListItems from './ShoppingListItems.vue';
import BaseButton from './base/BaseButton.vue';
import BaseInput from './base/BaseInput.vue';

const SHOPPING_LIST_KEY = 'shopping-list';

const items = ref<Item[]>(
  JSON.parse(localStorage.getItem(SHOPPING_LIST_KEY) || '[]'),
);

const updateStorage = () => {
  localStorage.setItem(SHOPPING_LIST_KEY, JSON.stringify(items.value));
};

const addItem = (item: Item) => {
  items.value.push(item);
  updateStorage();
};

const itemTitle = ref('');
const handleSubmit = () => {
  const item = {
    id: Date.now(),
    title: itemTitle.value,
  };
  itemTitle.value = '';
  addItem(item);
};

const handleRemove = (item: Item) => {
  items.value = items.value.filter((it) => it.id !== item.id);
  updateStorage();
};
</script>

<template>
  <div class="max-w-screen-sm mx-auto p-8 space-y-6">
    <form @submit.prevent="handleSubmit" class="flex gap-1 items-end">
      <label class="grow">
        Item
        <BaseInput v-model="itemTitle" />
      </label>
      <BaseButton>Add item</BaseButton>>
    </form>
    <ShoppingListItems :items="items" @remove="handleRemove" />
  </div>
</template>
