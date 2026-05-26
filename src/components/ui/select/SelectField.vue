<script setup lang="ts">
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  useId
} from 'vue';
import type { SelectOptionType } from '../../../types/select-option.ts';
import FieldError from '../field-error/FieldError.vue';
import FieldLabel from '../field-label/FieldLabel.vue';
import SelectOption from './SelectOption.vue';

const props = defineProps<{
  label: string;
  required?: boolean;
  options: SelectOptionType[];
  placeholder?: string;
  error?: string;
}>();

const model = defineModel<string | null>({ required: true });

const emit = defineEmits<{
  blur: [];
}>();

const fieldId = useId();
const root = ref<HTMLDivElement | null>(null);
const trigger = ref<HTMLButtonElement | null>(null);
const isOpen = ref(false);
const activeIndex = ref(-1);
const emptyOptionLabel = 'Не выбрано';

const placeholderLabel = computed(() => props.placeholder ?? emptyOptionLabel);

const visibleOptions = computed<
  Array<SelectOptionType | { label: string; value: null }>
>(() =>
  props.required
    ? props.options
    : [{ label: emptyOptionLabel, value: null }, ...props.options]
);

const selectedOption = computed(() =>
  props.options.find(option => option.value === model.value)
);

const selectedLabel = computed(
  () => selectedOption.value?.label ?? placeholderLabel.value
);

const hasValue = computed(() => model.value !== null);

const getSelectedIndex = () => {
  if (model.value === null) {
    return props.required ? -1 : 0;
  }

  const optionIndex = props.options.findIndex(
    option => option.value === model.value
  );
  return props.required ? optionIndex : optionIndex + 1;
};

const openList = async (preferredIndex?: number) => {
  if (isOpen.value || visibleOptions.value.length === 0) {
    return;
  }

  activeIndex.value = preferredIndex ?? Math.max(getSelectedIndex(), 0);
  isOpen.value = true;
  await nextTick();
  trigger.value?.focus();
};

const closeList = () => {
  isOpen.value = false;
  activeIndex.value = -1;
};

const toggleList = () => {
  if (isOpen.value) {
    closeList();
    return;
  }

  void openList();
};

const moveActive = (step: number) => {
  if (!isOpen.value) {
    void openList();
    return;
  }

  const optionsCount = visibleOptions.value.length;

  if (optionsCount === 0) {
    return;
  }

  activeIndex.value =
    activeIndex.value === -1
      ? 0
      : (activeIndex.value + step + optionsCount) % optionsCount;
};

const selectOption = (value: string | null) => {
  model.value = value;
  closeList();
  trigger.value?.focus();
};

const selectActiveOption = () => {
  const activeOption = visibleOptions.value[activeIndex.value];

  if (!activeOption) {
    return;
  }

  selectOption(activeOption.value);
};

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'ArrowDown') {
    event.preventDefault();
    moveActive(1);
    return;
  }

  if (event.key === 'ArrowUp') {
    event.preventDefault();
    moveActive(-1);
    return;
  }

  if (event.key === 'Home') {
    event.preventDefault();
    activeIndex.value = 0;
    void openList(0);
    return;
  }

  if (event.key === 'End') {
    event.preventDefault();
    activeIndex.value = visibleOptions.value.length - 1;
    void openList(visibleOptions.value.length - 1);
    return;
  }

  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();

    if (!isOpen.value) {
      void openList();
      return;
    }

    selectActiveOption();
    return;
  }

  if (event.key === 'Escape') {
    event.preventDefault();
    closeList();
    trigger.value?.focus();
  }
};

const handleFocusout = (event: FocusEvent) => {
  const nextTarget = event.relatedTarget;

  if (nextTarget instanceof Node && root.value?.contains(nextTarget)) {
    return;
  }

  closeList();
  emit('blur');
};

const handleDocumentPointerDown = (event: PointerEvent) => {
  const target = event.target;

  if (!(target instanceof Node) || root.value?.contains(target)) {
    return;
  }

  closeList();
};

onMounted(() => {
  document.addEventListener('pointerdown', handleDocumentPointerDown);
});

onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', handleDocumentPointerDown);
});
</script>

<template>
  <div
    ref="root"
    class="field"
    :class="{ invalid: error }"
    @focusout="handleFocusout"
  >
    <FieldLabel :for-id="fieldId" :required="required">
      {{ label }}
    </FieldLabel>

    <div class="select">
      <button
        ref="trigger"
        :id="fieldId"
        class="control"
        :class="{ empty: !hasValue }"
        type="button"
        :data-open="isOpen"
        @click="toggleList"
        @keydown="handleKeydown"
      >
        <span class="value">{{ selectedLabel }}</span>
        <span class="chevron"></span>
      </button>

      <Transition name="options">
        <ul v-if="isOpen" class="options">
          <SelectOption
            v-for="(option, index) in visibleOptions"
            :key="option.value ?? 'empty'"
            :label="option.label"
            :selected="option.value === model"
            :active="index === activeIndex"
            @pointerenter="activeIndex = index"
            @select="selectOption(option.value)"
          />
        </ul>
      </Transition>
    </div>

    <FieldError :message="error" />
  </div>
</template>

<style scoped>
.field {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.select {
  position: relative;
}

.control {
  display: flex;
  gap: 12px;
  align-items: center;
  appearance: none;
  width: 100%;
  min-height: 46px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: color-mix(in srgb, var(--color-surface) 92%, var(--color-canvas));
  color: var(--color-ink);
  cursor: pointer;
  font: inherit;
  outline: none;
  padding: 0 14px;
  text-align: left;
  transition:
    border-color 160ms ease,
    box-shadow 160ms ease,
    background-color 160ms ease;
}

.control:hover {
  border-color: color-mix(in srgb, var(--color-border) 72%, var(--color-ink));
}

.control:focus-visible,
.control[data-open='true'] {
  border-color: var(--color-accent);
  background-color: var(--color-surface);
  box-shadow: 0 0 0 4px rgb(var(--color-accent-rgb) / 14%);
}

.value {
  flex: 1 1 auto;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.empty .value {
  color: color-mix(in srgb, var(--color-ink) 58%, var(--color-surface));
}

.chevron {
  flex: 0 0 9px;
  width: 9px;
  height: 9px;
  border-right: 2px solid color-mix(in srgb, var(--color-ink) 68%, var(--color-surface));
  border-bottom: 2px solid color-mix(in srgb, var(--color-ink) 68%, var(--color-surface));
  transform: translateY(-2px) rotate(45deg);
  transition: transform 160ms ease;
}

.control[data-open='true'] .chevron {
  transform: translateY(2px) rotate(225deg);
}

.options {
  position: absolute;
  z-index: 10;
  top: calc(100% + 8px);
  right: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
  max-height: 220px;
  margin: 0;
  overflow: auto;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-surface);
  box-shadow: 0 18px 36px rgb(var(--color-ink-rgb) / 16%);
  list-style: none;
  padding: 6px;
}

.options-enter-active,
.options-leave-active {
  transition:
    opacity 120ms ease,
    transform 120ms ease;
}

.options-enter-from,
.options-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

.invalid .control {
  border-color: var(--color-danger);
  box-shadow: 0 0 0 4px rgb(var(--color-danger-rgb) / 12%);
}
</style>
