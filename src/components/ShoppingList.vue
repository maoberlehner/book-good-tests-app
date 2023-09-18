<script setup lang="ts">
import { ref } from 'vue';
import BaseButton from './BaseButton.vue';
import BaseInput from './BaseInput.vue';

type Item = {
  id: number;
  title: string;
};

const itemNew = ref('');
const items = ref<Item[]>([]);

const addItem = () => {
  items.value.push({
    id: items.value.length + 1,
    title: itemNew.value,
  });
  itemNew.value = '';
};
</script>

<template>
  <div>
    <ul>
      <li v-for="item in items" :key="item.id">
        {{ item.title }}
      </li>
    </ul>

    <label for="itemNew">
      Title
      <BaseInput type="text" id="itemNew" v-model="itemNew" />
    </label>
    <BaseButton @click="addItem">Add item</BaseButton>
  </div>
</template>
