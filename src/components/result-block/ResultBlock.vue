<script setup lang="ts">
import { computed } from 'vue';
import type { FormGeneratorModelType } from '../../types/form-generator-model.ts';
import Surface from '../ui/surface/Surface.vue';
import FieldLabel from '../ui/field-label/FieldLabel.vue';

const props = defineProps<{
  model: FormGeneratorModelType;
}>();

const formattedModel = computed(() => JSON.stringify(props.model, null, 2));
</script>

<template>
  <Surface class="block">
    <FieldLabel as="h4" class="title">Результатус</FieldLabel>

    <pre class="code">{{ formattedModel }}</pre>
  </Surface>
</template>

<style scoped>
.block {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.title {
  margin: 0;
}

.code {
  min-height: 0;
  max-width: 100%;
  margin: 0;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: color-mix(in srgb, var(--color-surface) 92%, var(--color-canvas));
  overflow: auto;
  color: var(--color-ink);
  font-family: 'Red Hat Mono', monospace;
  font-size: 0.9rem;
  line-height: 1.55;
  padding: 14px;
}
</style>
