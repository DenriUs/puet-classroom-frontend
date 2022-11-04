import zod from 'zod';
import { courseSchema } from './schemas';

export type CourseSchemaType = zod.infer<typeof courseSchema>;
