<div align="center">
  <h1>Form Generator Vue</h1>
  <p align="center">
    Конфигурируемый генератор форм на Vue 3, который строится по JSON-схеме и валидирует значения полей перед отправкой.
  </p>

[![Vue](https://img.shields.io/badge/Vue-42B883?logo=vue.js&logoColor=white)](#)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](#)

</div>

## Возможности

- Поля `text`, `email`, `password`, `select`, `checkbox`
- Валидация `required`, `minLength`, `maxLength`, `pattern`
- Реактивное обновление объекта, переданного в `v-model`
- Событие `submit`, которое срабатывает только при валидной форме

## Запуск

Предпросмотр:

```bash
npm install
npm run dev
```

Сборка:

```bash
npm install
npm run build
```

> [!TIP]
> После запуска, следует открыть приложение в браузере по адресу из терминала.
> Обычно это `http://localhost:5173`.

## Использование

Чтобы управлять формой, достаточно отредактировать схему в файле:

```text
src/config/form-schema.ts
```

Форма строится из массива `fields`, где каждый объект - это отдельное поле формы.

Пример:

```ts
{
  type: 'text',
  label: 'Имя',
  model: 'name',
  required: true,
  minLength: 2,
  maxLength: 40,
  placeholder: 'Анна',
  autocomplete: 'given-name'
}
```

Поддерживаемые типы полей:

- `text` - текст
- `email` - эл. почта
- `password` - пароль
- `select` - выпадающий список
- `checkbox` - чекбокс

Параметры полей:

- `type` - тип поля
- `label` - надпись над полем
- `model` - ключ в объекте данных формы
- `required` - обязательное поле
- `minLength` - минимальная длина
- `maxLength` - максимальная длина
- `pattern` - регулярное выражение для проверки
- `placeholder` - подсказка внутри поля
- `autocomplete` - значение HTML-атрибута `autocomplete`
- `options` - опции для поля `select`

## Как добавить новый тип поля

Инструкция добавления нового поля, на примере поля `date`.

1. Добавить тип в `src/types/form-schema.ts`:

```ts
export type DateField = BaseField & {
  type: 'date';
  min?: string;
  max?: string;
};

export type FormField = TextField | SelectField | CheckboxField | DateField;
```

2. Создать UI-компонент:

```text
src/components/ui/date-field/DateField.vue
```

3. Подключить его в `src/components/form-generator/FieldItem.vue`:

```vue
<DateField
  v-else-if="field.type === 'date'"
  v-model="stringValue"
  :label="field.label"
  :required="field.required"
  :min="field.min"
  :max="field.max"
  :error="error"
  @blur="emit('blur')"
/>
```

4. Если нужны новые правила, добавить отдельную функцию в `src/lib/validation` и подключить ее в `validate-form-field.ts`.
