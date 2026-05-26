<script setup lang="ts">
withDefaults(
  defineProps<{
    type?: 'button' | 'submit' | 'reset';
    formId?: string;
  }>(),
  {
    type: 'button'
  }
);
</script>

<template>
  <button class="button" :type="type" :form="formId">
    <slot />
  </button>
</template>

<style scoped>
.button {
  min-height: 48px;
  border: 0;
  border-radius: 8px;
  background: var(--color-accent);
  color: var(--color-surface);
  cursor: pointer;
  font: inherit;
  font-weight: 600;
  letter-spacing: 0;
  transition:
    background-color 200ms ease,
    transform 100ms ease;
}

.button:hover {
  background: color-mix(in srgb, var(--color-accent) 92%, var(--color-ink));
}

.button:active {
  transform: translateY(1px);
}
</style>
