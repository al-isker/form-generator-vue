<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue';
import { validateFormField } from '../../lib/validation';
import type { FormGeneratorModelType } from '../../types/form-generator-model.ts';
import type { FormFieldType, FormSchemeType } from '../../types/form-scheme';
import FieldItem from './FieldItem.vue';

const props = defineProps<{
  scheme: FormSchemeType;
  formId: string;
}>();

const model = defineModel<FormGeneratorModelType>({ required: true });

const emit = defineEmits<{
  submit: [value: FormGeneratorModelType];
}>();

const touched = reactive<Record<string, boolean>>({});
const submitted = ref(false);

const getDefaultFieldValue = (field: FormFieldType): unknown => {
  if (field.type === 'checkbox') {
    return false;
  }

  if (field.type === 'select') {
    return null;
  }

  return '';
};

const normalizeModel = () => {
  const nextModel: FormGeneratorModelType = {};
  let changed = false;

  for (const field of props.scheme.fields) {
    if (field.model in model.value) {
      nextModel[field.model] = model.value[field.model];
    } else {
      nextModel[field.model] = getDefaultFieldValue(field);
      changed = true;
    }
  }

  const currentKeys = Object.keys(model.value);
  const nextKeys = Object.keys(nextModel);

  if (currentKeys.length !== nextKeys.length) {
    changed = true;
  }

  if (changed) {
    model.value = nextModel;
  }
};

watch(() => props.scheme.fields, normalizeModel, {
  deep: true,
  immediate: true
});

const getFieldValue = (field: FormFieldType) =>
  field.model in model.value
    ? model.value[field.model]
    : getDefaultFieldValue(field);

const updateField = (modelName: string, value: unknown) => {
  model.value = {
    ...model.value,
    [modelName]: value
  };
};

const touchField = (modelName: string) => {
  touched[modelName] = true;
};

const errors = computed(() =>
  props.scheme.fields.reduce<Record<string, string | null>>((result, field) => {
    result[field.model] = validateFormField(field, model.value[field.model]);
    return result;
  }, {})
);

const visibleErrors = computed(() =>
  props.scheme.fields.reduce<Record<string, string>>((result, field) => {
    const error = errors.value[field.model];

    if (error && (touched[field.model] || submitted.value)) {
      result[field.model] = error;
    }

    return result;
  }, {})
);

const hasErrors = computed(() => Object.values(errors.value).some(Boolean));

const getFieldError = (modelName: string) =>
  visibleErrors.value[modelName] ?? '';

const validate = () => {
  submitted.value = true;

  for (const field of props.scheme.fields) {
    touched[field.model] = true;
  }

  return !hasErrors.value;
};

const handleSubmit = () => {
  if (!validate()) {
    return;
  }

  emit('submit', { ...model.value });
};

defineExpose({
  errors,
  validate
});
</script>

<template>
  <form :id="formId" class="form" novalidate @submit.prevent="handleSubmit">
    <FieldItem
      v-for="field in scheme.fields"
      :key="field.model"
      :field="field"
      :model-value="getFieldValue(field)"
      :error="getFieldError(field.model)"
      @update:model-value="updateField(field.model, $event)"
      @blur="touchField(field.model)"
    />
  </form>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}
</style>
