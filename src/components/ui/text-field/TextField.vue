<script setup lang="ts">
import { useId } from 'vue';
import FieldError from '../field-error/FieldError.vue';
import FieldLabel from '../field-label/FieldLabel.vue';

defineProps<{
  inputType?: 'text' | 'email' | 'password';
  label: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  placeholder?: string;
  autocomplete?: string;
  error?: string;
}>();

const model = defineModel<string>({ required: true });

const emit = defineEmits<{
  blur: [];
}>();

const fieldId = useId();
</script>

<template>
  <div class="field" :class="{ invalid: error }">
    <FieldLabel :for-id="fieldId" :required="required">
      {{ label }}
    </FieldLabel>

    <input
      v-model="model"
      class="control"
      :id="fieldId"
      :type="inputType"
      :placeholder="placeholder"
      :required="required"
      :minlength="minLength"
      :maxlength="maxLength"
      :pattern="pattern"
      :autocomplete="autocomplete"
      @blur="emit('blur')"
    />

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
  width: 100%;
  min-height: 46px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: color-mix(in srgb, var(--color-surface) 92%, var(--color-canvas));
  color: var(--color-ink);
  font: inherit;
  outline: none;
  padding: 0 14px;
  transition:
    border-color 160ms ease,
    box-shadow 160ms ease,
    background-color 160ms ease;
}

.control:focus {
  border-color: var(--color-accent);
  background-color: var(--color-surface);
  box-shadow: 0 0 0 4px rgb(var(--color-accent-rgb) / 14%);
}

.invalid .control {
  border-color: var(--color-danger);
  box-shadow: 0 0 0 4px rgb(var(--color-danger-rgb) / 12%);
}
</style>
