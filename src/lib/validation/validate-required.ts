import type { FormFieldType } from '../../types/form-schema';

export const validateRequired = (field: FormFieldType, value: unknown) => {
  if (!field.required) {
    return null;
  }

  if (field.type === 'checkbox') {
    return value === true ? null : 'нужно подтвердить';
  }

  return String(value ?? '').trim().length > 0 ? null : 'обязательное поле';
};
