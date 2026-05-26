import type { FormFieldType } from '../../types/form-schema';

export const validateMaxLength = (field: FormFieldType, value: unknown) => {
  if (
    field.type === 'checkbox' ||
    field.type === 'select' ||
    !field.maxLength
  ) {
    return null;
  }

  const currentValue = String(value ?? '');

  if (currentValue.length === 0 || currentValue.length <= field.maxLength) {
    return null;
  }

  return `максимум ${field.maxLength} символов`;
};
