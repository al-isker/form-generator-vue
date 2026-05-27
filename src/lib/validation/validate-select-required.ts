export const validateSelectRequired = (
  field: { required?: boolean },
  value: unknown
) => {
  if (!field.required) {
    return null;
  }

  return value !== null && value !== undefined ? null : 'обязательное поле';
};
