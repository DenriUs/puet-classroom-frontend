import zod from 'zod';
import { CourseTimeTableWeekdayEnum } from '../../../common';

export const timeSchema = zod.object({
  weekday: zod.nativeEnum(CourseTimeTableWeekdayEnum, {
    errorMap: (issue, ctx) => ({ message: 'Виберіть день' }),
  }),
  startTime: zod.coerce.date({ required_error: 'Введіть час початку пари' }),
  endTime: zod.coerce.date({ required_error: 'Введіть час закінчення пари' }),
});
