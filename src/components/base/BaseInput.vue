<script setup lang="ts">
const props = defineProps<{
  modelValue: string;
}>();

const emits = defineEmits<{
  (event: 'update:modelValue', value: string): void;
}>();
</script>

<template>
  <input
    class="w-full border border-teal-900 rounded p-3"
    :value="props.modelValue"
    @change="emits('update:modelValue', $event.target.value)"
  />
</template>
