<script setup lang="ts">
import CheckIcon from '../icons/CheckIcon.vue';

defineProps<{
  label: string;
  selected: boolean;
  active: boolean;
}>();

const emit = defineEmits<{
  select: [];
}>();
</script>

<template>
  <li
    class="option"
    :class="{ selected, active }"
    @mousedown.prevent
    @click="emit('select')"
  >
    <span class="label">{{ label }}</span>
    <CheckIcon v-if="selected" class="icon" />
  </li>
</template>

<style scoped>
.option {
  display: flex;
  gap: 10px;
  align-items: center;
  min-height: 36px;
  border-radius: 6px;
  color: var(--color-ink);
  cursor: pointer;
  padding: 8px 10px;
  transition:
    background-color 120ms ease,
    color 120ms ease;
}

.option.active {
  background: color-mix(in srgb, var(--color-accent) 12%, var(--color-surface));
}

.label {
  flex: 1 1 auto;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.icon {
  flex: 0 0 18px;
  width: 18px;
  height: 18px;
  fill: currentColor;
}
</style>
