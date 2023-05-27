import zod from 'zod';
import { groupSchema } from './schemas';

export type GroupSchemaType = zod.infer<typeof groupSchema>;
