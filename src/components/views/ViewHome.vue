<script setup lang="ts">
import BaseHeadline from '../BaseHeadline.vue';

const isLoggedIn = Boolean(localStorage.getItem('token'));
</script>

<template>
  <div v-if="isLoggedIn" class="space-y-4">
    <BaseHeadline level="1">Shopping list</BaseHeadline>
    <p>TODO</p>
  </div>
  <div v-else>
    <RouterLink to="/login">Log in</RouterLink>
  </div>
</template>
