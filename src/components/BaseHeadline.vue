<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  level: '1' | '2' | '3';
}>();

const sizeClassesForLevel = {
  1: 'text-2xl',
  2: 'text-xl',
  3: 'text-lg',
};

const cssClasses = computed(() => [sizeClassesForLevel[props.level]]);
</script>

<template>
  <Component :is="`h${$props.level}`" :class="cssClasses"><slot /></Component>
</template>
