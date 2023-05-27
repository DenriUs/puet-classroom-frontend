import zod from 'zod';
import { specialitySchema } from './schemas';

export type SpecialitySchemaType = zod.infer<typeof specialitySchema>;
