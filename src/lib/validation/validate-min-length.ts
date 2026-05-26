import type { FormFieldType } from '../../types/form-schema';

export const validateMinLength = (field: FormFieldType, value: unknown) => {
  if (
    field.type === 'checkbox' ||
    field.type === 'select' ||
    !field.minLength
  ) {
    return null;
  }

  const currentValue = String(value ?? '');

  if (currentValue.length === 0 || currentValue.length >= field.minLength) {
    return null;
  }

  return `минимум ${field.minLength} символов`;
};
