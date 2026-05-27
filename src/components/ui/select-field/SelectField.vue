<script setup lang="ts">
import { useId } from 'vue';
import type { SelectOptionType } from '../../../types/select-option.ts';
import FieldError from '../field-error/FieldError.vue';
import FieldLabel from '../field-label/FieldLabel.vue';
import Select from '../select/Select.vue';

defineProps<{
  label: string;
  required?: boolean;
  options: SelectOptionType[];
  placeholder?: string;
  error?: string;
}>();

const model = defineModel<unknown>({ required: true });

const emit = defineEmits<{
  blur: [];
}>();

const fieldId = useId();
</script>

<template>
  <div class="field">
    <FieldLabel :for-id="fieldId" :required="required">
      {{ label }}
    </FieldLabel>

    <Select
      :id="fieldId"
      v-model="model"
      :required="required"
      :options="options"
      :placeholder="placeholder"
      :invalid="Boolean(error)"
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
</style>
