export const validateMaxLength = (
  field: { maxLength?: number },
  value: unknown
) => {
  if (field.maxLength === undefined) {
    return null;
  }

  const currentValue = String(value ?? '');

  if (currentValue.length === 0 || currentValue.length <= field.maxLength) {
    return null;
  }

  return `максимум ${field.maxLength} символов`;
};
