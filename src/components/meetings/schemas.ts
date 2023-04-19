import zod from 'zod';

export const meetingSchema = zod.object({
  courseId: zod.string({ required_error: 'Виберіть курс' }).optional(),
});
