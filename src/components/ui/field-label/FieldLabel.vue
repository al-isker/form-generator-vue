<script setup lang="ts">
withDefaults(
  defineProps<{
    as?: 'label' | 'span';
    forId?: string;
    required?: boolean;
  }>(),
  {
    as: 'label',
    forId: undefined,
    required: false
  }
);
</script>

<template>
  <component :is="as" class="label" :for="as === 'label' ? forId : undefined">
    <slot />
    <span v-if="required" class="required">*</span>
  </component>
</template>

<style scoped>
.label {
  color: var(--color-ink);
  font-size: 0.9rem;
  font-weight: 700;
  line-height: 1.35;
}

.required {
  margin-left: 1.5px;
  color: var(--color-danger);
}
</style>
