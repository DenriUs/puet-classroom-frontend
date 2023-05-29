import zod from 'zod';

export const timeSchema = zod.object({
  date: zod.coerce.date({ required_error: 'Введіть день' }),
  startTime: zod.coerce.date({ required_error: 'Введіть час початку пари' }),
  endTime: zod.coerce.date({ required_error: 'Введіть час закінчення пари' }),
});
