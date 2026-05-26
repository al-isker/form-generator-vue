<script setup lang="ts">
import { ref } from 'vue';
import FormGenerator from './components/form-generator/FormGenerator.vue';
import LiveBlock from './components/live-block/LiveBlock.vue';
import SubmittedBlock from './components/submitted-block/SubmittedBlock.vue';
import Button from './components/ui/button/Button.vue';
import Header from './components/ui/header/Header.vue';
import Surface from './components/ui/surface/Surface.vue';
import { formSchema } from './config/form-schema';
import type { FormGeneratorModelType } from './types/form-generator-model.ts';

const formData = ref<FormGeneratorModelType>({});
const lastSubmit = ref<FormGeneratorModelType | null>(null);
const formId = 'form-generator';

const handleSubmit = (value: FormGeneratorModelType) => {
  lastSubmit.value = value;
};
</script>

<template>
  <div class="container">
    <Header class="header" />

    <main class="main">
      <Surface class="form-panel">
        <FormGenerator
          v-model="formData"
          :form-id="formId"
          :schema="formSchema"
          @submit="handleSubmit"
        />

        <Button type="submit" :form-id="formId">Отправить</Button>
      </Surface>

      <aside class="sidebar">
        <LiveBlock :model="formData" />
        <SubmittedBlock :submitted="Boolean(lastSubmit)" />
      </aside>
    </main>
  </div>
</template>

<style scoped>
:global(*) {
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
}

:global(body) {
  min-width: 320px;
  margin: 0;
  background:
    linear-gradient(var(--color-border) 1px, transparent 1px),
    linear-gradient(90deg, var(--color-border) 1px, transparent 1px),
    var(--color-canvas);
  background-size: 32px 32px;
  color: var(--color-ink);
  font-family: 'Google Sans', sans-serif;
}

:global(button),
:global(input),
:global(select) {
  font: inherit;
}

.container {
  min-height: 100vh;
  width: min(900px, 100%);
  margin: 0 auto;
  padding: 42px 20px;
}

.header {
  margin-bottom: 28px;
}

.main {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
  align-items: start;
}

.form-panel {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.sidebar {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

@media (max-width: 820px) {
  .container {
    padding: 28px 14px;
  }

  .main {
    grid-template-columns: 1fr;
  }
}
</style>
