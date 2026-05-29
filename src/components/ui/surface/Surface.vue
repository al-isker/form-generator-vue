<script setup lang="ts">
import { computed, useAttrs } from 'vue';

defineOptions({
  inheritAttrs: false
});

const attrs = useAttrs();

const surfaceClass = computed(() => ['surface', attrs.class]);

const surfaceAttrs = computed(() => {
  const { class: _class, ...restAttrs } = attrs;
  return restAttrs;
});
</script>

<template>
  <section v-bind="surfaceAttrs" :class="surfaceClass">
    <slot />
  </section>
</template>

<style scoped>
.surface {
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: rgb(var(--color-surface-rgb) / 88%);
  box-shadow: 0 18px 52px rgb(var(--color-ink-rgb) / 10%);
  padding: 24px;
}

@media (max-width: 768px) {
  .surface {
    padding: 18px;
  }
}
</style>
