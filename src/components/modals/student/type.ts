import zod from 'zod';
import { studentSchema } from './schemas';

export type StudentSchemaType = zod.infer<typeof studentSchema>;
