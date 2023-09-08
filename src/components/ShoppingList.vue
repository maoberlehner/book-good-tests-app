<script setup lang="ts">
import { ref } from 'vue';

import BaseButton from './BaseButton.vue';
import BaseInput from './BaseInput.vue';
import BaseHeadline from './BaseHeadline.vue';

let items = ref([]);
let itemNewTitle = ref(``);

let addItem = async () => {
  items.value.push({ title: itemNewTitle.value });
};
</script>

<template>
  <div class="space-y-6">
    <ul class="space-y-2">
      <li v-for="item in items" :key="item.id">
        <div
          class="rounded px-4 py-3 bg-teal-600 text-white text-left w-full transition-colors"
        >
          {{ item.title }}
        </div>
      </li>
    </ul>

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
