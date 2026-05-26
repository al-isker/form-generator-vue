<script setup lang="ts">
import { computed } from 'vue';
import type { FormFieldType } from '../../types/form-schema';
import CheckboxField from '../ui/checkbox-field/CheckboxField.vue';
import EmailField from '../ui/email-field/EmailField.vue';
import PasswordField from '../ui/password-field/PasswordField.vue';
import SelectField from '../ui/select/SelectField.vue';
import TextField from '../ui/text-field/TextField.vue';

const props = defineProps<{
  field: FormFieldType;
  modelValue: unknown;
  error?: string;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: unknown];
  blur: [];
}>();

const stringValue = computed({
  get: () => (typeof props.modelValue === 'string' ? props.modelValue : ''),
  set: (value: string) => emit('update:modelValue', value)
});

const selectValue = computed({
  get: () => (typeof props.modelValue === 'string' ? props.modelValue : null),
  set: (value: string | null) => emit('update:modelValue', value)
});

const booleanValue = computed({
  get: () => props.modelValue === true,
  set: (value: boolean) => emit('update:modelValue', value)
});
</script>

<template>
  <TextField
    v-if="field.type === 'text'"
    v-model="stringValue"
    :label="field.label"
    :required="field.required"
    :min-length="field.minLength"
    :max-length="field.maxLength"
    :pattern="field.pattern"
    :placeholder="field.placeholder"
    :autocomplete="field.autocomplete"
    :error="error"
    @blur="emit('blur')"
  />

  <EmailField
    v-else-if="field.type === 'email'"
    v-model="stringValue"
    :label="field.label"
    :required="field.required"
    :min-length="field.minLength"
    :max-length="field.maxLength"
    :pattern="field.pattern"
    :placeholder="field.placeholder"
    :autocomplete="field.autocomplete"
    :error="error"
    @blur="emit('blur')"
  />

  <PasswordField
    v-else-if="field.type === 'password'"
    v-model="stringValue"
    :label="field.label"
    :required="field.required"
    :min-length="field.minLength"
    :max-length="field.maxLength"
    :pattern="field.pattern"
    :placeholder="field.placeholder"
    :autocomplete="field.autocomplete"
    :error="error"
    @blur="emit('blur')"
  />

  <SelectField
    v-else-if="field.type === 'select'"
    v-model="selectValue"
    :label="field.label"
    :required="field.required"
    :options="field.options"
    :placeholder="field.placeholder"
    :error="error"
    @blur="emit('blur')"
  />

  <CheckboxField
    v-else
    v-model="booleanValue"
    :label="field.label"
    :required="field.required"
    :error="error"
    @blur="emit('blur')"
  />
</template>
