import type { FormFieldType } from '../../types/form-scheme';
import { validateCheckboxRequired } from './validate-checkbox-required';
import { validateMaxLength } from './validate-max-length';
import { validateMinLength } from './validate-min-length';
import { validatePattern } from './validate-pattern';
import { validateSelectRequired } from './validate-select-required';
import { validateTextRequired } from './validate-text-required';

export const validateFormField = (field: FormFieldType, value: unknown) => {
  switch (field.type) {
    case 'text':
    case 'email':
    case 'password':
      return (
        validateTextRequired(field, value) ||
        validateMinLength(field, value) ||
        validateMaxLength(field, value) ||
        validatePattern(field, value)
      );
    case 'select':
      return validateSelectRequired(field, value);
    case 'checkbox':
      return validateCheckboxRequired(field, value);
  }
};
