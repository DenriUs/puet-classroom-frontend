import zod from 'zod';

export const courseSchema = zod.object({
  name: zod
    .string({ required_error: 'Введіть назву курсу' })
    .min(2, 'Закоротка назва')
    .max(120, 'Завелика назва'),
  group: zod.string({ required_error: 'Введіть групу' }),
  description: zod
    .string({ required_error: 'Введіть опис курсу' })
    .min(2, 'Закороткий опис')
    .max(360, 'Завеликий опис'),
});

export const courseUpdateSchema = zod.object({
  name: zod
    .string({ required_error: 'Введіть назву курсу' })
    .min(2, 'Закоротка назва')
    .max(120, 'Завелика назва'),
  description: zod
    .string({ required_error: 'Введіть опис курсу' })
    .min(2, 'Закороткий опис')
    .max(360, 'Завеликий опис'),
});
