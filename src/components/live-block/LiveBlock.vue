<script setup lang="ts">
import { computed } from 'vue';
import type { FormGeneratorModelType } from '../../types/form-generator-model.ts';
import Surface from '../ui/surface/Surface.vue';

const props = defineProps<{
  model: FormGeneratorModelType;
}>();

const formattedModel = computed(() => JSON.stringify(props.model, null, 2));
</script>

<template>
  <Surface class="block" tone="dark">
    <div class="heading">
      <h4 class="title">Live</h4>
    </div>
    <pre class="code">{{ formattedModel }}</pre>
  </Surface>
</template>

<style scoped>
.block {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.heading {
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
}

.title {
  margin: 0;
  color: var(--color-surface);
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.2;
}

.code {
  min-height: 0;
  max-width: 100%;
  margin: 0;
  overflow: auto;
  color: var(--color-surface);
  font-family: 'Red Hat Mono', monospace;
  font-size: 0.9rem;
  line-height: 1.55;
  white-space: pre-wrap;
  word-break: break-word;
}
</style>
