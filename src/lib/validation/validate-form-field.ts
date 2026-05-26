import type { FormFieldType } from '../../types/form-schema';
import { validateMaxLength } from './validate-max-length';
import { validateMinLength } from './validate-min-length';
import { validatePattern } from './validate-pattern';
import { validateRequired } from './validate-required';

export const validateFormField = (field: FormFieldType, value: unknown) => {
  return (
    validateRequired(field, value) ||
    validateMinLength(field, value) ||
    validateMaxLength(field, value) ||
    validatePattern(field, value)
  );
};
