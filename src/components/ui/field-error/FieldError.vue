<script setup lang="ts">
defineProps<{
  message?: string;
}>();
</script>

<template>
  <p v-if="message" class="error">
    {{ message }}
  </p>
</template>

<style scoped>
.error {
  margin: 0;
  color: var(--color-danger);
  font-size: 0.82rem;
  font-weight: 500;
  line-height: 1.35;
}
</style>
