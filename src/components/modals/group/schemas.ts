import zod from 'zod';

export const groupSchema = zod.object({
  name: zod
    .string({ required_error: 'Введіть назву спеціальності' })
    .min(2, 'Закоротка назва')
    .max(120, 'Завелика назва'),
  courseNumber: zod.string({ required_error: 'Виберіть номер курсу' }),
  specialityId: zod.string({ required_error: 'Виберіть спеціальність' }),
});
