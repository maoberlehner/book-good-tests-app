<script setup lang="ts">
import { ref } from 'vue';

import { useAuth } from '../../composables/auth';

const name = ref('');
const password = ref('');

const { logIn } = useAuth();
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <h1 class="text-3xl font-bold mb-4">Log in</h1>
    <form
      class="flex flex-col space-y-4"
      @submit.prevent="logIn({ name, password })"
    >
      <div>
        <label for="name" class="font-bold">Username</label>
        <input
          type="text"
          id="name"
          v-model="name"
          class="border rounded p-2"
        />
      </div>
      <div>
        <label for="password" class="font-bold">Password</label>
        <input
          type="password"
          id="password"
          v-model="password"
          class="border rounded p-2"
        />
      </div>
      <button type="submit" class="bg-blue-500 text-white rounded p-2">
        Log in
      </button>
    </form>
  </div>
</template>
