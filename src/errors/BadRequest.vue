<template>
  <div class="error-page">
    <h1>{{ common.errors.badRequest.title }}</h1>
    <p>{{ common.errors.badRequest.message }}</p>
  <router-link to="/home">{{ common.errors.backToHome }}</router-link>
  </div>
</template>

<script setup lang="ts">
import { common } from '@/term';
</script>

<style scoped>
.error-page { padding: 2rem; text-align: center; }
h1 { margin-bottom: 1rem; }
p { margin-bottom: 1.5rem; }
</style>
