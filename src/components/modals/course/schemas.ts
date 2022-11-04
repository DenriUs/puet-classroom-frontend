import zod from 'zod';

export const courseSchema = zod.object({
  name: zod
    .string({ required_error: 'Введіть назву курсу' })
    .min(2, 'Закоротка назва')
    .max(300, 'Завелика назва'),
  group: zod.string({ required_error: 'Введіть групу' }),
});
