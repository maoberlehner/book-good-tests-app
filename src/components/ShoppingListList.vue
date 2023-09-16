<script setup lang="ts">
import { Item } from '../composables/item';

defineProps<{
  items: Omit<Item, 'userId'>[];
}>();

const emits = defineEmits<{
  (event: 'remove-item', value: string): void;
}>();
</script>

<template>
  <ul class="space-y-2">
    <li v-for="item in items" :key="item.id">
      <button
        class="rounded px-4 py-3 bg-teal-600 text-white text-left w-full transition-colors"
        @click="emits('remove-item', item.id)"
      >
        {{ item.title }}
      </button>
    </li>
  </ul>
</template>
