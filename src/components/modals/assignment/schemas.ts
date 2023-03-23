import zod from 'zod';

export const assignmentSchema = zod.object({
  mark: zod.number({ required_error: 'Введіть оцінку' }).min(0, 'Занижено').max(101, 'Забагато'),
});
