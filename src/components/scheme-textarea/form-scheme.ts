import { z } from 'zod';

const baseFieldScheme = z.object({
  label: z.string(),
  model: z.string(),
  required: z.boolean().optional()
});

const textFieldScheme = baseFieldScheme
  .extend({
    type: z.enum(['text', 'email', 'password']),
    minLength: z.number().optional(),
    maxLength: z.number().optional(),
    pattern: z.string().optional(),
    placeholder: z.string().optional(),
    autocomplete: z.string().optional()
  })
  .strict();

const selectOptionScheme = z
  .object({
    label: z.string(),
    value: z.unknown().optional()
  })
  .strict();

const selectFieldScheme = baseFieldScheme
  .extend({
    type: z.literal('select'),
    options: z.array(selectOptionScheme),
    placeholder: z.string().optional()
  })
  .strict();

const checkboxFieldScheme = baseFieldScheme
  .extend({
    type: z.literal('checkbox')
  })
  .strict();

export const formScheme = z
  .object({
    fields: z.array(
      z.discriminatedUnion('type', [
        textFieldScheme,
        selectFieldScheme,
        checkboxFieldScheme
      ])
    )
  })
  .strict();
