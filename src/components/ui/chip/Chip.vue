<script setup lang="ts">
defineProps<{
  color: 'success' | 'warning';
  text: string;
}>();
</script>

<template>
  <span class="chip" :class="`chip--${color}`">
    {{ text }}
  </span>
</template>

<style scoped>
.chip {
  min-width: 58px;
  border: 1px solid color-mix(in srgb, var(--chip-color) 46%, transparent);
  border-radius: 999px;
  padding: 7px 13px;
  color: var(--chip-color);
  font-size: 0.78rem;
  font-weight: 700;
  text-align: center;
}

.chip--success {
  --chip-color: var(--color-status-success);
}

.chip--warning {
  --chip-color: var(--color-status-warning);
}
</style>
