<script setup lang="ts">
import type { Item } from '../entities/shopping-list';

const props = defineProps<{
  items: Item[];
}>();
const emits = defineEmits<{
  (event: 'remove', item: Item): void;
}>();
</script>

<template>
  <ul class="space-y-2">
    <li
      v-for="item in props.items"
      :key="item.id"
      class="rounded px-4 py-3 bg-teal-600 border border-teal-600 hover:bg-teal-700 hover:border-teal-700 text-white transition-colors"
    >
      {{ item.title }}
      <button @click="emits('remove', item)">
        Remove <span class="sr-only">{{ item.title }}</span>
      </button>
    </li>
  </ul>
</template>
