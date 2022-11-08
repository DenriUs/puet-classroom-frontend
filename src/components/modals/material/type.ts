import zod from 'zod';
import { materialSchema } from './schemas';

export type MaterialSchemaType = zod.infer<typeof materialSchema>;
