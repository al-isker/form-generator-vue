import type { SelectOptionType } from './select-option';

type BaseFieldType = {
  label: string;
  model: string;
  required?: boolean;
};

type TextFieldType = BaseFieldType & {
  type: 'text' | 'email' | 'password';
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  placeholder?: string;
  autocomplete?: string;
};

type SelectFieldType = BaseFieldType & {
  type: 'select';
  options: SelectOptionType[];
  placeholder?: string;
};

type CheckboxFieldType = BaseFieldType & {
  type: 'checkbox';
};

export type FormFieldType = TextFieldType | SelectFieldType | CheckboxFieldType;

export type FormSchemeType = {
  fields: FormFieldType[];
};
