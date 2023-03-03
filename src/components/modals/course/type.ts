import zod from 'zod';
import { courseSchema, courseUpdateSchema } from './schemas';

export type CourseSchemaType = zod.infer<typeof courseSchema>;

export type CourseUpdateSchemaType = zod.infer<typeof courseUpdateSchema>;
