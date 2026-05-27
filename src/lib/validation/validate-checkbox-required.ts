export const validateCheckboxRequired = (
  field: { required?: boolean },
  value: unknown
) => {
  if (!field.required) {
    return null;
  }

  return value === true ? null : 'нужно подтвердить';
};
