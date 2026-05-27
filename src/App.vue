<script setup lang="ts">
import { ref, shallowRef } from 'vue';
import FormGenerator from './components/form-generator/FormGenerator.vue';
import LiveBlock from './components/live-block/LiveBlock.vue';
import SchemeTextarea from './components/scheme-textarea/SchemeTextarea.vue';
import Button from './components/ui/button/Button.vue';
import Header from './components/ui/header/Header.vue';
import Surface from './components/ui/surface/Surface.vue';
import { defaultFormScheme } from './const/default-form-scheme.ts';
import type { FormGeneratorModelType } from './types/form-generator-model.ts';
import type { FormSchemeType } from './types/form-scheme';

const formData = ref<FormGeneratorModelType>({});
const schemeSource = ref(JSON.stringify(defaultFormScheme, null, 2));
const activeScheme = shallowRef<FormSchemeType>(defaultFormScheme);
const formId = 'form-generator';

const handleSchemeChange = (scheme: FormSchemeType) => {
  activeScheme.value = scheme;
};
</script>

<template>
  <div class="container">
    <Header class="header" />

    <main class="main">
      <aside class="left-panel">
        <SchemeTextarea
          v-model="schemeSource"
          class="scheme-panel"
          @scheme-change="handleSchemeChange"
        />

        <LiveBlock :model="formData" />
      </aside>

      <Surface class="form-panel">
        <FormGenerator
          v-model="formData"
          :form-id="formId"
          :scheme="activeScheme"
        />

        <Button type="submit" :form-id="formId">Отправить</Button>
      </Surface>
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
:global(select),
:global(textarea) {
  font: inherit;
}

.container {
  min-height: 100vh;
  width: min(1120px, 100%);
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

.left-panel {
  display: flex;
  flex-direction: column;
  gap: 18px;
  min-width: 0;
}

.form-panel {
  display: flex;
  flex-direction: column;
  gap: 32px;
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
