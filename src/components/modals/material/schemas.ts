import zod from 'zod';
import { CourseActivityTypeEnum } from '../../../common/types';

export const materialSchema = zod.object({
  title: zod
    .string({ required_error: 'Введіть назву' })
    .min(2, 'Закоротка назва')
    .max(300, 'Завелика назва'),
  type: zod.nativeEnum(CourseActivityTypeEnum),
});
