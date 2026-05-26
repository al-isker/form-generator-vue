<script setup lang="ts">
import { useId } from 'vue';
import FieldError from '../field-error/FieldError.vue';
import FieldLabel from '../field-label/FieldLabel.vue';
import CheckIcon from '../icons/CheckIcon.vue';

defineProps<{
  label: string;
  required?: boolean;
  error?: string;
}>();

const model = defineModel<boolean>({ required: true });

const emit = defineEmits<{
  blur: [];
}>();

const fieldId = useId();
</script>

<template>
  <div class="field" :class="{ invalid: error }">
    <label class="control" :for="fieldId">
      <input
        v-model="model"
        :id="fieldId"
        type="checkbox"
        @blur="emit('blur')"
      />
      <span class="mark">
        <CheckIcon />
      </span>
      <FieldLabel as="span" :required="required">
        {{ label }}
      </FieldLabel>
    </label>

    <FieldError :message="error" />
  </div>
</template>

<style scoped>
.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.control {
  display: flex;
  gap: 12px;
  align-items: center;
  cursor: pointer;
}

.control input {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
}

.mark {
  flex: 0 0 22px;
  width: 22px;
  height: 22px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  background: color-mix(in srgb, var(--color-surface) 92%, var(--color-canvas));
  transition:
    background-color 160ms ease,
    border-color 160ms ease,
    box-shadow 160ms ease;
}

.mark svg {
  width: 16px;
  height: 16px;
  fill: var(--color-surface);
}

.control input:checked + .mark {
  border-color: var(--color-accent);
  background: var(--color-accent);
}

.control input:checked + .mark svg {
  opacity: 1;
  transform: scale(1);
}

.control input:focus-visible + .mark {
  box-shadow: 0 0 0 4px rgb(var(--color-accent-rgb) / 14%);
}

.invalid .mark {
  border-color: var(--color-danger);
  box-shadow: 0 0 0 4px rgb(var(--color-danger-rgb) / 12%);
}
</style>
