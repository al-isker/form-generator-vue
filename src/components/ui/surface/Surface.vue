<script setup lang="ts">
import { computed, useAttrs } from 'vue';

defineOptions({
  inheritAttrs: false
});

const props = withDefaults(
  defineProps<{
    tone?: 'light' | 'dark';
  }>(),
  {
    tone: 'light'
  }
);

const attrs = useAttrs();

const surfaceClass = computed(() => [
  'surface',
  `surface--${props.tone}`,
  attrs.class
]);

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
  box-shadow: 0 18px 52px rgb(var(--color-ink-rgb) / 10%);
}

.surface--light {
  padding: 24px;
  background: rgb(var(--color-surface-rgb) / 88%);
}

.surface--dark {
  padding: 20px;
  background: var(--color-ink);
}

@media (max-width: 820px) {
  .surface--light {
    padding: 18px;
  }
}
</style>
