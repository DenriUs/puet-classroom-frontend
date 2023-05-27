import zod from 'zod';
import { teacherSchema } from './schemas';

export type TeacherSchemaType = zod.infer<typeof teacherSchema>;
