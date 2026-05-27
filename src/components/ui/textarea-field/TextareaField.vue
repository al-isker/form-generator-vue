<script setup lang="ts">
import { computed, useAttrs, useId } from 'vue';
import FieldError from '../field-error/FieldError.vue';
import FieldLabel from '../field-label/FieldLabel.vue';
import Textarea from '../textarea/Textarea.vue';

defineOptions({
  inheritAttrs: false
});

const props = defineProps<{
  label: string;
  required?: boolean;
  error?: string;
  textareaClass?: string;
}>();

const model = defineModel<string>({ required: true });

const emit = defineEmits<{
  blur: [];
}>();

const attrs = useAttrs();
const fieldId = useId();

const textAreaClass = computed(() => ['control', props.textareaClass]);

const textAreaAttrs = computed(() => {
  const { class: _class, ...restAttrs } = attrs;
  return restAttrs;
});
</script>

<template>
  <div class="field" :class="{ invalid: error }">
    <FieldLabel :for-id="fieldId" :required="required">
      {{ label }}
    </FieldLabel>

    <Textarea
      v-bind="textAreaAttrs"
      :id="fieldId"
      v-model="model"
      :class="textAreaClass"
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
