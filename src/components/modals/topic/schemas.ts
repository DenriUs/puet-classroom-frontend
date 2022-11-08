import zod from 'zod';

export const topicSchema = zod.object({
  title: zod
    .string({ required_error: 'Введіть назву теми' })
    .min(2, 'Закоротка назва')
    .max(300, 'Завелика назва'),
});
