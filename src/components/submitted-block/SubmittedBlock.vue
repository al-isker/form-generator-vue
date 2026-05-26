<script setup lang="ts">
import { computed } from 'vue';
import Chip from '../ui/chip/Chip.vue';
import Surface from '../ui/surface/Surface.vue';

const props = defineProps<{
  submitted: boolean;
}>();

const status = computed(() => (props.submitted ? 'YES' : 'NO'));
const color = computed(() => (props.submitted ? 'success' : 'warning'));
</script>

<template>
  <Surface class="block" tone="dark">
    <h4 class="title">Submitted</h4>
    <Chip :color="color" :text="status" />
  </Surface>
</template>

<style scoped>
.block {
  display: flex;
  flex-direction: row;
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
</style>
