<script setup lang="ts">
import { ref, watch } from 'vue';
import type { FormSchemeType } from '../../types/form-scheme';
import Surface from '../ui/surface/Surface.vue';
import TextareaField from '../ui/textarea-field/TextareaField.vue';
import { formScheme } from './form-scheme.ts';

const model = defineModel<string>({ required: true });

const emit = defineEmits<{
  'scheme-change': [scheme: FormSchemeType];
}>();

const error = ref('');

const handleSchemeSourceChange = (value: string) => {
  try {
    const scheme = formScheme.parse(JSON.parse(value));

    error.value = '';

    emit('scheme-change', scheme);
  } catch (caughtError) {
    error.value =
      caughtError instanceof SyntaxError
        ? 'схема должна быть валидным JSON'
        : 'схема не соответствует ожидаемой структуре';
  }
};

watch(model, handleSchemeSourceChange, {
  immediate: true
});
</script>

<template>
  <Surface class="scheme-textarea">
    <TextareaField
      v-model="model"
      label="Схемус"
      textarea-class="scheme-control"
      required
      :error="error"
      spellcheck="false"
    />
  </Surface>
</template>

<style scoped>
.scheme-textarea {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

:deep(.scheme-control) {
  min-height: 300px;
}
</style>
