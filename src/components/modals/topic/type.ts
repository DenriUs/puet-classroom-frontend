import zod from 'zod';
import { topicSchema } from './schemas';

export type TopicSchemaType = zod.infer<typeof topicSchema>;
