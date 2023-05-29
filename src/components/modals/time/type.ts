import zod from 'zod';
import { timeSchema } from './schemas';

export type TimeSchemaType = zod.infer<typeof timeSchema>;
