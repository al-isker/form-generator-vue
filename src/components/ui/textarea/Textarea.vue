<script setup lang="ts">
import { computed, useAttrs } from 'vue';

defineOptions({
  inheritAttrs: false
});

const props = withDefaults(
  defineProps<{
    invalid?: boolean;
  }>(),
  {
    invalid: false
  }
);

const model = defineModel<string>({ required: true });
const attrs = useAttrs();

const textAreaClass = computed(() => [
  'control',
  {
    invalid: props.invalid
  },
  attrs.class
]);

const textAreaAttrs = computed(() => {
  const { class: _class, ...restAttrs } = attrs;
  return restAttrs;
});
</script>

<template>
  <textarea v-bind="textAreaAttrs" v-model="model" :class="textAreaClass" />
</template>

<style scoped>
.control {
  width: 100%;
  resize: vertical;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: color-mix(in srgb, var(--color-surface) 92%, var(--color-canvas));
  color: var(--color-ink);
  font-family: 'Red Hat Mono', monospace;
  font-size: 0.9rem;
  line-height: 1.55;
  outline: none;
  padding: 14px;
  tab-size: 2;
  transition:
    border-color 160ms ease,
    box-shadow 160ms ease,
    background-color 160ms ease;
  white-space: pre;
}

.control:focus {
  border-color: var(--color-accent);
  background-color: var(--color-surface);
  box-shadow: 0 0 0 4px rgb(var(--color-accent-rgb) / 14%);
}

.control.invalid {
  border-color: var(--color-danger);
  box-shadow: 0 0 0 4px rgb(var(--color-danger-rgb) / 12%);
}
</style>
