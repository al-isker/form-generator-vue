export const validateMinLength = (
  field: { minLength?: number },
  value: unknown
) => {
  if (field.minLength === undefined) {
    return null;
  }

  const currentValue = String(value ?? '');

  if (currentValue.length === 0 || currentValue.length >= field.minLength) {
    return null;
  }

  return `минимум ${field.minLength} символов`;
};
