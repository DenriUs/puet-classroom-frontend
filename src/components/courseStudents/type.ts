import zod from 'zod';
import { courseStudentSchema } from './schemas';

export type CouserStudentSchemaType = zod.infer<typeof courseStudentSchema>;