import type { FormFieldType } from '../../types/form-schema';

export const validatePattern = (field: FormFieldType, value: unknown) => {
  if (field.type === 'checkbox' || field.type === 'select' || !field.pattern) {
    return null;
  }

  const currentValue = String(value ?? '');

  if (currentValue.length === 0) {
    return null;
  }

  try {
    const regexp = new RegExp(field.pattern);
    return regexp.test(currentValue) ? null : 'неверный формат';
  } catch {
    return 'некорректный pattern в схеме';
  }
};
