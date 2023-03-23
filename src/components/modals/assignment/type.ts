import zod from 'zod';
import { assignmentSchema } from './schemas';

export type AssignmentSchemaType = zod.infer<typeof assignmentSchema>;