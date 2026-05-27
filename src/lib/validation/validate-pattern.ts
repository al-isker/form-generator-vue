export const validatePattern = (
  field: { pattern?: string },
  value: unknown
) => {
  if (!field.pattern) {
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
