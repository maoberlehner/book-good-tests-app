<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <div class="max-w-screen-sm mx-auto p-4 space-y-6">
    <header>
      <div class="wrapper">
        <nav class="flex gap-3">
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/about">About</RouterLink>
        </nav>
      </div>
    </header>

    <RouterView />
  </div>
</template>
