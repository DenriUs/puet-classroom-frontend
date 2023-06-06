import zod from 'zod';

export const courseStudentSchema = zod.object({
  studentId: zod.string({ required_error: 'Виберіть студента' }),
});
