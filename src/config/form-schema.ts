import type { FormSchemaType } from '../types/form-schema';

export const formSchema: FormSchemaType = {
  fields: [
    {
      type: 'text',
      label: 'Имя',
      model: 'name',
      required: true,
      minLength: 2,
      maxLength: 40,
      placeholder: 'Анна',
      autocomplete: 'given-name'
    },
    {
      type: 'email',
      label: 'Email',
      model: 'email',
      required: true,
      pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$',
      placeholder: 'name@example.com',
      autocomplete: 'email'
    },
    {
      type: 'password',
      label: 'Пароль',
      model: 'password',
      required: true,
      minLength: 6,
      maxLength: 32,
      autocomplete: 'new-password'
    },
    {
      type: 'select',
      label: 'Пол',
      model: 'gender',
      options: [
        { label: 'Мужской', value: 'male' },
        { label: 'Женский', value: 'female' }
      ]
    },
    {
      type: 'select',
      label: 'Специализация',
      model: 'specialization',
      options: [
        { label: 'Frontend-разработчик', value: 'frontend-developer' },
        { label: 'Backend-разработчик', value: 'backend-developer' },
        { label: 'Дизайнер', value: 'designer' },
        { label: 'Тестировщик', value: 'qa-engineer' },
        { label: 'DevOps-инженер', value: 'devops-engineer' }
      ],
      required: true
    },
    {
      type: 'checkbox',
      label: 'Согласен с условиями',
      model: 'terms',
      required: true
    }
  ]
};
