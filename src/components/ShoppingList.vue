<script setup lang="ts">
import { ref } from 'vue';

import BaseButton from './BaseButton.vue';
import BaseInput from './BaseInput.vue';
import BaseHeadline from './BaseHeadline.vue';
import ShoppingListList from './ShoppingListList.vue';

let items = ref([]);
let itemNewTitle = ref(``);

let addItem = async () => {
  items.value.push({ title: itemNewTitle.value });
};
let removeItem = async (id: number) => {
  items.value = items.value.filter((item) => item.id !== id);
};
</script>

<template>
  <div class="space-y-6">
    <ShoppingListList :items="items" @removeItem="removeItem" />

    <div>
      <BaseHeadline level="2">Add new item</BaseHeadline>
      <form @submit.prevent="addItem" class="flex gap-2 items-end">
        <div class="space-y-1 flex flex-col flex-grow">
          <label for="title">Title</label>
          <BaseInput id="title" v-model="itemNewTitle" name="title" />
        </div>
        <BaseButton>Add item</BaseButton>
      </form>
    </div>
  </div>
</template>
