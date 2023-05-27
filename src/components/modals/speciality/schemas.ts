import zod from 'zod';

export const specialitySchema = zod.object({
  name: zod
    .string({ required_error: 'Введіть назву спеціальності' })
    .min(2, 'Закоротка назва')
    .max(120, 'Завелика назва'),
});
