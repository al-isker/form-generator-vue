<script setup lang="ts">
import TextField from '../text-field/TextField.vue';

defineProps<{
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
</script>

<template>
  <TextField
    v-model="model"
    input-type="email"
    :label="label"
    :required="required"
    :min-length="minLength"
    :max-length="maxLength"
    :pattern="pattern"
    :placeholder="placeholder"
    :autocomplete="autocomplete"
    :error="error"
    @blur="emit('blur')"
  />
</template>
