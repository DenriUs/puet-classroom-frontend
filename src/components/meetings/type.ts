import zod from 'zod';
import { meetingSchema } from './schemas';

export type MeetingSchemaType = zod.infer<typeof meetingSchema>;
