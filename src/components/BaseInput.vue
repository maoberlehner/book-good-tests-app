<script setup lang="ts">
defineProps<{
  modelValue: string;
}>();
defineEmits<{
  (event: 'update:modelValue', value: string): void;
}>();
</script>

<template>
  <input
    class="w-full border border-teal-900 rounded p-3"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>
