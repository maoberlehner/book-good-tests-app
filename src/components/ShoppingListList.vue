<script setup lang="ts">
defineProps<{
  items: { id: number; title: string }[];
}>();

const emits = defineEmits<{
  (event: 'removeItem', value: number): void;
}>();
</script>

<template>
  <ul class="space-y-2">
    <li v-for="item in items" :key="item.id">
      <button
        class="rounded px-4 py-3 bg-teal-600 text-white text-left w-full transition-colors"
        @click="emits('removeItem', item.id)"
      >
        {{ item.title }}
      </button>
    </li>
  </ul>
</template>
