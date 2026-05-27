export const validateTextRequired = (
  field: { required?: boolean },
  value: unknown
) => {
  if (!field.required) {
    return null;
  }

  return typeof value === 'string' && value.trim().length > 0
    ? null
    : 'обязательное поле';
};
